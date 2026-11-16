"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Bookmark,
  BookmarkCheck,
  FileText,
  Video,
  Download,
  Clock,
  ExternalLink,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { useApp } from "@/context/AppContext";
import { StudyMaterial, StudyMaterialType } from "@/lib/types";

export default function StudyMaterialsPage() {
  const { studyMaterials, toggleBookmarkMaterial, selectedExam } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Active viewing modal
  const [readingMaterial, setReadingMaterial] = useState<StudyMaterial | null>(null);

  const filteredMaterials = studyMaterials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "all" || m.type === selectedType;
    const matchesDiff = selectedDifficulty === "all" || m.difficulty === selectedDifficulty;
    const matchesBookmark = !onlyBookmarked || m.isBookmarked;

    return matchesSearch && matchesType && matchesDiff && matchesBookmark;
  });

  const getTypeIcon = (type: StudyMaterialType) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4 text-slate-600" />;
      case "formula_sheet":
        return <FileText className="w-4 h-4 text-slate-600" />;
      case "revision_guide":
        return <BookOpen className="w-4 h-4 text-slate-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Study Materials & Faculty Notes</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated syllabus guides, high-yield formula sheets, and reference materials calibrated for {selectedExam.toUpperCase()}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {filteredMaterials.length} of {studyMaterials.length} materials available
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, formulas, topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Formats</option>
            <option value="notes">Subject Notes</option>
            <option value="formula_sheet">Formula Sheets</option>
            <option value="revision_guide">Revision Guides</option>
            <option value="video">Video Lectures</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`px-3 py-1.5 rounded-md border flex items-center gap-1.5 transition-colors whitespace-nowrap text-xs ${
              onlyBookmarked
                ? "bg-slate-900 text-white border-slate-900 font-medium"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? "fill-white" : ""}`} />
            <span>Saved Only</span>
          </button>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((mat) => (
          <Card key={mat.id} className="flex flex-col justify-between p-5 border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  {getTypeIcon(mat.type)}
                  <span className="capitalize">{mat.type.replace("_", " ")}</span>
                </span>
                <button
                  onClick={() => toggleBookmarkMaterial(mat.id)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                  aria-label="Bookmark"
                >
                  {mat.isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-slate-900 fill-slate-900" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-1">{mat.title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{mat.description}</p>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
                <span className="font-medium text-slate-700">{mat.subject}</span>
                <span className="text-slate-300">•</span>
                <span>{mat.topic}</span>
              </div>
            </div>

            <div className="pt-4 mt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {mat.readTimeMinutes} min read
              </span>

              <Button
                variant="outline"
                size="xs"
                onClick={() => setReadingMaterial(mat)}
                className="gap-1 font-medium"
              >
                Open Reader <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Reader Modal */}
      <Modal
        isOpen={Boolean(readingMaterial)}
        onClose={() => setReadingMaterial(null)}
        title={readingMaterial?.title}
        description={`${readingMaterial?.subject} • ${readingMaterial?.topic} • ${readingMaterial?.fileSize || "Article"}`}
        maxWidth="3xl"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{readingMaterial?.examId?.toUpperCase()}</Badge>
              <Badge variant="neutral">{readingMaterial?.difficulty}</Badge>
              <span className="text-slate-500 text-xs">{readingMaterial?.readTimeMinutes} mins read time</span>
            </div>
            <Button
              variant="outline"
              size="xs"
              onClick={() => alert("Downloading PDF preview copy to your device...")}
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </Button>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-lg leading-relaxed text-slate-800 space-y-3 prose prose-slate max-w-none text-xs">
            <h4 className="text-sm font-semibold text-slate-900">Summary & Key Concepts</h4>
            <p className="text-slate-600 leading-relaxed">{readingMaterial?.description}</p>
            {readingMaterial?.contentMarkdown ? (
              <div className="whitespace-pre-line font-mono text-[11px] bg-slate-50 p-4 rounded-md border border-slate-200 leading-relaxed">
                {readingMaterial.contentMarkdown}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-md border border-slate-200 text-slate-800 space-y-1.5">
                <h5 className="font-semibold text-xs text-slate-900">Core Subject Specification:</h5>
                <p>
                  1. The fundamental theorem of algebra states that every non-zero single-variable polynomial of degree n with complex coefficients has exactly n complex roots.
                </p>
                <p>2. Maintain dimensional consistency across all unit conversions in physics and chemistry problem sets.</p>
                <p>3. Evaluate boundary conditions: zero, infinity, and sign change critical values.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setReadingMaterial(null)}>
              Close Document
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
