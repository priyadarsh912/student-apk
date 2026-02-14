import { useState } from "react";
import { BookOpen, Search, ChevronRight, Home, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SubjectCard } from "./SubjectCard";
import { UnitCard } from "./UnitCard";
import { FileCard } from "./FileCard";
import { subjects, units, files, Subject, Unit } from "@/data/lmsData";

type View = 'subjects' | 'units' | 'files';

export function LMSPage() {
    const [currentView, setCurrentView] = useState<View>('subjects');
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [semesterFilter, setSemesterFilter] = useState<number | null>(null);
    const [fileTypeFilter, setFileTypeFilter] = useState<string | null>(null);

    const handleSubjectClick = (subject: Subject) => {
        setSelectedSubject(subject);
        setCurrentView('units');
        setSearchQuery("");
    };

    const handleUnitClick = (unit: Unit) => {
        setSelectedUnit(unit);
        setCurrentView('files');
        setSearchQuery("");
    };

    const handleBackToSubjects = () => {
        setCurrentView('subjects');
        setSelectedSubject(null);
        setSelectedUnit(null);
        setSearchQuery("");
    };

    const handleBackToUnits = () => {
        setCurrentView('units');
        setSelectedUnit(null);
        setSearchQuery("");
    };

    // Filter subjects
    const filteredSubjects = subjects.filter(subject => {
        const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSemester = semesterFilter === null || subject.semester === semesterFilter;
        return matchesSearch && matchesSemester;
    });

    // Get units for selected subject
    const subjectUnits = selectedSubject
        ? units.filter(unit => unit.subjectId === selectedSubject.id)
        : [];

    // Filter units
    const filteredUnits = subjectUnits.filter(unit =>
        unit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get files for selected unit
    const unitFiles = selectedUnit
        ? files.filter(file => file.unitId === selectedUnit.id)
        : [];

    // Filter files
    const filteredFiles = unitFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = fileTypeFilter === null || file.type === fileTypeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Learning Management System</h1>
                    <p className="text-muted-foreground">
                        Access your course materials, notes, and resources
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm">
                <button
                    onClick={handleBackToSubjects}
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                >
                    <Home className="h-4 w-4" />
                    <span>Subjects</span>
                </button>
                {selectedSubject && (
                    <>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <button
                            onClick={handleBackToUnits}
                            className="hover:text-accent transition-colors"
                        >
                            {selectedSubject.name}
                        </button>
                    </>
                )}
                {selectedUnit && (
                    <>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-accent">{selectedUnit.name}</span>
                    </>
                )}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={
                            currentView === 'subjects' ? "Search subjects..." :
                                currentView === 'units' ? "Search units..." :
                                    "Search files..."
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {currentView === 'subjects' && (
                    <div className="flex gap-2">
                        <Button
                            variant={semesterFilter === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSemesterFilter(null)}
                        >
                            All
                        </Button>
                        <Button
                            variant={semesterFilter === 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSemesterFilter(1)}
                        >
                            Sem 1
                        </Button>
                        <Button
                            variant={semesterFilter === 2 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSemesterFilter(2)}
                        >
                            Sem 2
                        </Button>
                    </div>
                )}

                {currentView === 'files' && (
                    <div className="flex gap-2">
                        <Button
                            variant={fileTypeFilter === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFileTypeFilter(null)}
                        >
                            All
                        </Button>
                        <Button
                            variant={fileTypeFilter === 'pdf' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFileTypeFilter('pdf')}
                        >
                            PDF
                        </Button>
                        <Button
                            variant={fileTypeFilter === 'ppt' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFileTypeFilter('ppt')}
                        >
                            PPT
                        </Button>
                        <Button
                            variant={fileTypeFilter === 'notes' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFileTypeFilter('notes')}
                        >
                            Notes
                        </Button>
                    </div>
                )}
            </div>

            {/* Stats */}
            {currentView === 'subjects' && (
                <div className="flex gap-4">
                    <Badge variant="secondary" className="text-sm">
                        {filteredSubjects.length} Subjects
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                        {units.length} Total Units
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                        {files.length} Total Files
                    </Badge>
                </div>
            )}

            {currentView === 'units' && selectedSubject && (
                <div className="flex gap-4">
                    <Badge variant="secondary" className="text-sm">
                        {filteredUnits.length} Units
                    </Badge>
                </div>
            )}

            {currentView === 'files' && selectedUnit && (
                <div className="flex gap-4">
                    <Badge variant="secondary" className="text-sm">
                        {filteredFiles.length} Files
                    </Badge>
                </div>
            )}

            {/* Content Area */}
            {currentView === 'subjects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject) => (
                            <SubjectCard
                                key={subject.id}
                                subject={subject}
                                onClick={() => handleSubjectClick(subject)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No subjects found matching your search.
                        </div>
                    )}
                </div>
            )}

            {currentView === 'units' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredUnits.length > 0 ? (
                        filteredUnits.map((unit) => (
                            <UnitCard
                                key={unit.id}
                                unit={unit}
                                onClick={() => handleUnitClick(unit)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No units found matching your search.
                        </div>
                    )}
                </div>
            )}

            {currentView === 'files' && (
                <div className="grid gap-3">
                    {filteredFiles.length > 0 ? (
                        filteredFiles.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            No files found matching your criteria.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
