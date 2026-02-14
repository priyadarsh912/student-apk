import { useState, useEffect } from "react";
import { MapPin, Coffee, BookOpen, Wallet, Star, Navigation, Search, Loader2, Crosshair } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getUserLocation, searchNearbyPlaces, PlaceResult } from "@/lib/maps";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon missing in Leaflet + Webpack/Vite
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to update map center when location changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function ExplorerGuide() {
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      let location = userLoc;

      // If no location, try to get it first
      if (!location) {
        try {
          location = await getUserLocation();
          setUserLoc(location);
        } catch (error) {
          toast({
            title: "Location Required",
            description: "Please enable location access to find places near you.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      const results = await searchNearbyPlaces(location, query);
      setPlaces(results);

      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `Try a different search term in your area.`,
        });
      }
    } catch (error: any) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
        description: error.message || "Could not fetch places",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    setLoading(true);
    getUserLocation()
      .then((loc) => {
        setUserLoc(loc);
        toast({
          title: "Location Updated",
          description: "Found your current location",
        });
        // Auto search for generic "places" if query is empty
        handleSearch(searchQuery || "cafe library food");
      })
      .catch((error) => {
        toast({
          title: "Location Error",
          description: "Could not access your location. Please check browser permissions.",
          variant: "destructive",
        });
        setLoading(false);
      });
  };

  const categories = [
    { label: "Study Spots", icon: BookOpen, query: "library" },
    { label: "Cheap Eats", icon: Wallet, query: "restaurant" },
    { label: "Coffee", icon: Coffee, query: "cafe" },
    { label: "Recreation", icon: Star, query: "park" },
  ];

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl btn-gradient flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Explorer's Guide</h1>
            <p className="text-muted-foreground">Discover places (Powered by OpenStreetMap)</p>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search places..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleLocationClick} title="Use my location">
            <Crosshair className="h-4 w-4" />
          </Button>
          <Button className="btn-gradient" onClick={() => handleSearch(searchQuery)} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Find"}
          </Button>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {categories.map((cat) => (
          <Badge
            key={cat.label}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-white transition-all px-3 py-1.5 gap-1.5 text-sm"
            onClick={() => {
              setSearchQuery(cat.query);
              handleSearch(cat.query);
            }}
          >
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Results List */}
        <div className="order-2 lg:order-1 overflow-y-auto pr-2 space-y-4 max-h-[600px] lg:max-h-full">
          {places.length > 0 ? (
            places.map((place) => (
              <Card key={place.id} className="card-elevated interactive-card border-l-4 border-l-primary/50">
                <CardHeader className="pb-2 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <CardTitle className="text-base truncate" title={place.name}>{place.name}</CardTitle>
                      <p className="text-xs text-muted-foreground capitalize truncate">{place.type}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {place.vicinity}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full hover:bg-primary hover:text-white transition-colors h-8 text-xs"
                    onClick={() => window.open(`https://www.openstreetmap.org/node/${place.id}`, '_blank')}
                  >
                    <Navigation className="h-3 w-3 mr-2" />
                    View on OSM
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {loading ? "Searching..." : "No places found yet. Try searching!"}
            </div>
          )}
        </div>

        {/* Map View */}
        <div className="order-1 lg:order-2 lg:col-span-2 rounded-xl overflow-hidden border border-border shadow-sm relative min-h-[300px]">
          {userLoc ? (
            <MapContainer
              center={[userLoc.lat, userLoc.lng]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={[userLoc.lat, userLoc.lng]} />

              {/* User Location Marker */}
              <Marker position={[userLoc.lat, userLoc.lng]}>
                <Popup>You are here</Popup>
              </Marker>

              {/* Place Markers */}
              {places.map((place) => (
                <Marker key={place.id} position={[place.lat, place.lng]}>
                  <Popup>
                    <strong>{place.name}</strong><br />
                    {place.type}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-muted/20">
              <MapPin className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Enable location to see the map</p>
              <Button onClick={handleLocationClick} variant="outline" className="mt-4">
                <Crosshair className="h-4 w-4 mr-2" />
                Enable Location
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
