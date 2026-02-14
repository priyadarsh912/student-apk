import { useState } from "react";
import { Library as LibraryIcon, Search, Book, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category: string;
    available: number;
    total: number;
}

const mockBooks: Book[] = [
    { id: '1', title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest', isbn: '978-0262033848', category: 'Computer Science', available: 3, total: 10 },
    { id: '2', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Programming', available: 5, total: 8 },
    { id: '3', title: 'Design Patterns', author: 'Gang of Four', isbn: '978-0201633610', category: 'Software Engineering', available: 2, total: 6 },
    { id: '4', title: 'Database System Concepts', author: 'Silberschatz, Korth', isbn: '978-0073523323', category: 'Database', available: 4, total: 7 },
    { id: '5', title: 'Computer Networks', author: 'Tanenbaum', isbn: '978-0132126953', category: 'Networks', available: 0, total: 5 },
    { id: '6', title: 'Operating System Concepts', author: 'Silberschatz', isbn: '978-1118063330', category: 'OS', available: 6, total: 10 },
];

export function Library() {
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const filteredBooks = mockBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleReserve = (book: Book) => {
        if (book.available > 0) {
            toast({
                title: "Book Reserved",
                description: `"${book.title}" has been reserved. Collect from library within 24 hours.`,
            });
        } else {
            toast({
                title: "Not Available",
                description: "This book is currently out of stock.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <LibraryIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Library</h1>
                    <p className="text-muted-foreground">
                        Search and reserve books
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search books by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Book List */}
            <div className="grid gap-3">
                {filteredBooks.map(book => (
                    <Card key={book.id} className="card-elevated hover:shadow-lg transition-all">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-4 flex-1">
                                    <div className="h-16 w-12 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Book className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-lg">{book.title}</h4>
                                        <p className="text-sm text-muted-foreground">{book.author}</p>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                            <span>ISBN: {book.isbn}</span>
                                            <Badge variant="outline" className="text-xs">{book.category}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            {book.available > 0 ? (
                                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                    {book.available} available
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    Out of stock
                                                </Badge>
                                            )}
                                            <span className="text-xs text-muted-foreground">Total: {book.total}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => handleReserve(book)}
                                    disabled={book.available === 0}
                                    className="bg-accent hover:bg-accent/90"
                                >
                                    Reserve
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
