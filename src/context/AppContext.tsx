"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  UserRole,
  MockTest,
  TestAttemptResult,
  Flashcard,
  FlashcardDeck,
  StudyMaterial,
  KidsActivity,
  ChildProfile,
  CareerProfile,
  CareerCounsellor,
  CounsellingBooking,
  StudyTask,
  TaskStatus,
  StudyScheduleBlock,
  Question,
  AdminAuditLog,
} from "@/lib/types";
import {
  DEFAULT_USER_PROFILE,
  INITIAL_MOCK_TESTS,
  INITIAL_FLASHCARD_DECKS,
  INITIAL_FLASHCARDS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_CHILDREN_ACTIVITIES,
  INITIAL_CHILD_PROFILES,
  INITIAL_CAREER_PROFILES,
  INITIAL_COUNSELLORS,
  INITIAL_BOOKINGS,
  INITIAL_STUDY_TASKS,
  INITIAL_SCHEDULE_BLOCKS,
  INITIAL_TEST_RESULTS,
  INITIAL_ADMIN_LOGS,
} from "@/lib/storage";
import { SupportedExamId } from "@/config/brand.config";
import { calculateSM2, ReviewRating } from "@/lib/spaced-repetition";

interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "exam" | "task" | "counselling" | "flashcard" | "system";
}

interface AppContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  selectedExam: SupportedExamId;
  setSelectedExam: (examId: SupportedExamId) => void;
  
  // Mock Tests
  mockTests: MockTest[];
  testResults: TestAttemptResult[];
  submitTestResult: (result: TestAttemptResult) => void;

  // Flashcards
  decks: FlashcardDeck[];
  flashcards: Flashcard[];
  reviewCard: (cardId: string, rating: ReviewRating) => void;
  addFlashcard: (deckId: string, front: string, back: string, tags: string[]) => void;
  createDeck: (title: string, subject: string, description: string) => void;

  // Study Materials
  studyMaterials: StudyMaterial[];
  toggleBookmarkMaterial: (materialId: string) => void;

  // Children Activities
  childrenActivities: KidsActivity[];
  childProfiles: ChildProfile[];
  completeKidsActivity: (activityId: string, stars: number) => void;

  // Career
  careerProfiles: CareerProfile[];
  counsellors: CareerCounsellor[];
  bookings: CounsellingBooking[];
  addBooking: (booking: Omit<CounsellingBooking, "id">) => void;

  // Tasks & Schedule
  tasks: StudyTask[];
  addTask: (task: Omit<StudyTask, "id">) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  scheduleBlocks: StudyScheduleBlock[];

  // Admin
  auditLogs: AdminAuditLog[];
  approveQuestion: (questionId: string) => void;
  addCustomQuestion: (question: Question) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [mockTests, setMockTests] = useState<MockTest[]>(INITIAL_MOCK_TESTS);
  const [testResults, setTestResults] = useState<TestAttemptResult[]>(INITIAL_TEST_RESULTS);
  const [decks, setDecks] = useState<FlashcardDeck[]>(INITIAL_FLASHCARD_DECKS);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [childrenActivities, setChildrenActivities] = useState<KidsActivity[]>(INITIAL_CHILDREN_ACTIVITIES);
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>(INITIAL_CHILD_PROFILES);
  const [careerProfiles, setCareerProfiles] = useState<CareerProfile[]>(INITIAL_CAREER_PROFILES);
  const [counsellors, setCounsellors] = useState<CareerCounsellor[]>(INITIAL_COUNSELLORS);
  const [bookings, setBookings] = useState<CounsellingBooking[]>(INITIAL_BOOKINGS);
  const [tasks, setTasks] = useState<StudyTask[]>(INITIAL_STUDY_TASKS);
  const [scheduleBlocks, setScheduleBlocks] = useState<StudyScheduleBlock[]>(INITIAL_SCHEDULE_BLOCKS);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(INITIAL_ADMIN_LOGS);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "notif-1",
      title: "18 Flashcards Due Today",
      message: "Keep your 14-day study streak alive by clearing your SAT Math queue.",
      timestamp: "10 mins ago",
      read: false,
      type: "flashcard",
    },
    {
      id: "notif-2",
      title: "Counselling Session Confirmed",
      message: "Dr. Elena Rostova confirmed your 1:1 strategy session for Nov 20.",
      timestamp: "2 hours ago",
      read: false,
      type: "counselling",
    },
    {
      id: "notif-3",
      title: "Predictive Score Update",
      message: "Your estimated SAT score range increased to 1440 - 1510 after recent practice.",
      timestamp: "1 day ago",
      read: true,
      type: "exam",
    },
  ]);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("apex_profile");
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedTasks = localStorage.getItem("apex_tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));

      const savedCards = localStorage.getItem("apex_cards");
      if (savedCards) setFlashcards(JSON.parse(savedCards));

      const savedResults = localStorage.getItem("apex_results");
      if (savedResults) setTestResults(JSON.parse(savedResults));
    } catch (e) {
      // Ignore storage errors on SSR
    }
  }, []);

  // Save updates to localStorage
  const saveState = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  };

  const setActiveRole = (role: UserRole) => {
    setProfile((prev) => {
      const updated = { ...prev, activeRole: role };
      saveState("apex_profile", updated);
      return updated;
    });
  };

  const setSelectedExam = (examId: SupportedExamId) => {
    setProfile((prev) => {
      const updated = { ...prev, selectedExam: examId };
      saveState("apex_profile", updated);
      return updated;
    });
  };

  const submitTestResult = (result: TestAttemptResult) => {
    setTestResults((prev) => {
      const updated = [result, ...prev];
      saveState("apex_results", updated);
      return updated;
    });

    // Update profile streak and study time
    setProfile((prev) => {
      const updated = {
        ...prev,
        totalStudyHours: Number((prev.totalStudyHours + result.timeSpentSeconds / 3600).toFixed(1)),
      };
      saveState("apex_profile", updated);
      return updated;
    });
  };

  const reviewCard = (cardId: string, rating: ReviewRating) => {
    setFlashcards((prev) => {
      const updated = prev.map((card) => {
        if (card.id !== cardId) return card;
        const sm2 = calculateSM2(card, rating);
        return {
          ...card,
          interval: sm2.interval,
          repetition: sm2.repetition,
          easeFactor: sm2.easeFactor,
          dueDate: sm2.dueDate,
          state: sm2.state,
          reviewCount: card.reviewCount + 1,
          lapses: rating === 1 ? card.lapses + 1 : card.lapses,
          lastReviewed: new Date().toISOString(),
        };
      });
      saveState("apex_cards", updated);
      return updated;
    });
  };

  const addFlashcard = (deckId: string, front: string, back: string, tags: string[]) => {
    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      deckId,
      front,
      back,
      tags,
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
      state: "new",
      reviewCount: 0,
      lapses: 0,
    };
    setFlashcards((prev) => {
      const updated = [newCard, ...prev];
      saveState("apex_cards", updated);
      return updated;
    });
  };

  const createDeck = (title: string, subject: string, description: string) => {
    const newDeck: FlashcardDeck = {
      id: `deck-${Date.now()}`,
      title,
      subject,
      description,
      totalCards: 0,
      dueTodayCount: 0,
      masteredCount: 0,
      color: "from-blue-600 to-indigo-600",
    };
    setDecks((prev) => [newDeck, ...prev]);
  };

  const toggleBookmarkMaterial = (materialId: string) => {
    setStudyMaterials((prev) =>
      prev.map((m) => (m.id === materialId ? { ...m, isBookmarked: !m.isBookmarked } : m))
    );
  };

  const completeKidsActivity = (activityId: string, stars: number) => {
    setChildrenActivities((prev) =>
      prev.map((act) =>
        act.id === activityId ? { ...act, isCompleted: true, starsEarned: Math.max(act.starsEarned, stars) } : act
      )
    );
    // Update child profile stars
    setChildProfiles((prev) =>
      prev.map((c, i) => (i === 0 ? { ...c, totalStars: c.totalStars + stars, completedActivities: c.completedActivities + 1 } : c))
    );
  };

  const addBooking = (bookingData: Omit<CounsellingBooking, "id">) => {
    const newBooking: CounsellingBooking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const addTask = (taskData: Omit<StudyTask, "id">) => {
    const newTask: StudyTask = {
      ...taskData,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => {
      const updated = [newTask, ...prev];
      saveState("apex_tasks", updated);
      return updated;
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) => {
      const updated: StudyTask[] = prev.map((t) =>
        t.id === taskId
          ? { ...t, status: (t.status === "completed" ? "todo" : "completed") as TaskStatus }
          : t
      );
      saveState("apex_tasks", updated);
      return updated;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== taskId);
      saveState("apex_tasks", updated);
      return updated;
    });
  };

  const approveQuestion = (questionId: string) => {
    setMockTests((prev) =>
      prev.map((test) => ({
        ...test,
        questions: test.questions.map((q) => (q.id === questionId ? { ...q, status: "approved" as const } : q)),
      }))
    );
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        action: "Question Approved",
        user: "Admin (Current Session)",
        details: `Approved Question #${questionId} into active test bank.`,
      },
      ...prev,
    ]);
  };

  const addCustomQuestion = (question: Question) => {
    setMockTests((prev) =>
      prev.map((test) => {
        if (test.examId === question.examId) {
          return {
            ...test,
            questions: [...test.questions, question],
            totalQuestions: test.totalQuestions + 1,
          };
        }
        return test;
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        activeRole: profile.activeRole,
        setActiveRole,
        selectedExam: profile.selectedExam,
        setSelectedExam,
        mockTests,
        testResults,
        submitTestResult,
        decks,
        flashcards,
        reviewCard,
        addFlashcard,
        createDeck,
        studyMaterials,
        toggleBookmarkMaterial,
        childrenActivities,
        childProfiles,
        completeKidsActivity,
        careerProfiles,
        counsellors,
        bookings,
        addBooking,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        scheduleBlocks,
        auditLogs,
        approveQuestion,
        addCustomQuestion,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
