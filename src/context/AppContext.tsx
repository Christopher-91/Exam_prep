"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  UserRole,
  AuthUser,
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
  // Authentication
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean }>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean }>;
  resetPassword: (password: string) => Promise<{ success: boolean }>;
  verifyEmail: (code: string) => Promise<{ success: boolean }>;
  completeOnboarding: (data: Partial<UserProfile>) => void;

  // Profile & Role
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
  toggleScheduleBlock: (blockId: string) => void;

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
  // Auth state: initialized with authenticated status or restored from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: DEFAULT_USER_PROFILE.id,
    name: DEFAULT_USER_PROFILE.name,
    email: DEFAULT_USER_PROFILE.email,
    avatarUrl: DEFAULT_USER_PROFILE.avatarUrl,
    role: DEFAULT_USER_PROFILE.activeRole,
    isEmailVerified: true,
    onboarded: true,
    institution: DEFAULT_USER_PROFILE.institution,
    createdAt: DEFAULT_USER_PROFILE.createdAt,
  });

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
      title: "Spaced Repetition Review Queue",
      message: "6 active recall cards scheduled for review today.",
      timestamp: "10m ago",
      read: false,
      type: "flashcard",
    },
    {
      id: "notif-2",
      title: "Admissions Consultation Confirmed",
      message: "Session with Dr. Elena Rostova confirmed for Nov 24, 04:00 PM EST.",
      timestamp: "2h ago",
      read: false,
      type: "counselling",
    },
    {
      id: "notif-3",
      title: "Diagnostic Score Calibration",
      message: "Predicted SAT score interval updated to 1440–1510 based on recent performance.",
      timestamp: "1d ago",
      read: true,
      type: "exam",
    },
  ]);

  // Load from localStorage if present and purge any legacy mock data
  useEffect(() => {
    try {
      const authStatus = localStorage.getItem("acuity_auth");
      if (authStatus !== null) {
        setIsAuthenticated(authStatus === "true");
      }

      const savedUserStr = localStorage.getItem("acuity_user");
      if (savedUserStr) {
        const parsed = JSON.parse(savedUserStr);
        // Automatically overwrite stale mock data from previous sessions
        if (
          !parsed.name ||
          parsed.name === "Alexander Vance" ||
          parsed.email?.includes("alexander.vance") ||
          parsed.name?.toLowerCase().includes("vance")
        ) {
          parsed.name = "Rohan Christopher";
          parsed.email = "rohan@acuitysystems.edu";
          localStorage.setItem("acuity_user", JSON.stringify(parsed));
        }
        setCurrentUser(parsed);
      }

      const savedProfileStr = localStorage.getItem("acuity_profile");
      if (savedProfileStr) {
        const parsedProfile = JSON.parse(savedProfileStr);
        if (
          !parsedProfile.name ||
          parsedProfile.name === "Alexander Vance" ||
          parsedProfile.email?.includes("alexander.vance") ||
          parsedProfile.name?.toLowerCase().includes("vance")
        ) {
          parsedProfile.name = "Rohan Christopher";
          parsedProfile.email = "rohan@acuitysystems.edu";
          parsedProfile.streakDays = 1;
          parsedProfile.totalStudyHours = 1.5;
        }
        // If profile has the legacy hardcoded mock date '2026-12-14', clear it so the user can set their actual date
        if (parsedProfile.targetDate === "2026-12-14") {
          parsedProfile.targetDate = "";
        }
        localStorage.setItem("acuity_profile", JSON.stringify(parsedProfile));
        setProfile(parsedProfile);
      }

      const savedBlocks = localStorage.getItem("acuity_schedule_blocks");
      if (savedBlocks) {
        try {
          const parsedBlocks = JSON.parse(savedBlocks);
          setScheduleBlocks(parsedBlocks);
        } catch (e) {
          setScheduleBlocks(INITIAL_SCHEDULE_BLOCKS);
        }
      } else {
        setScheduleBlocks(INITIAL_SCHEDULE_BLOCKS);
      }

      const savedTasks = localStorage.getItem("acuity_tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));

      const savedCards = localStorage.getItem("acuity_cards");
      if (savedCards) setFlashcards(JSON.parse(savedCards));

      const savedResults = localStorage.getItem("acuity_results");
      if (savedResults) setTestResults(JSON.parse(savedResults));
    } catch (e) {
      // Ignore storage errors on SSR
    }
  }, []);

  const saveState = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  };

  // Auth Operations
  const login = async (email: string, password: string, rememberMe = true) => {
    // Standard mock credential validation
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password." };
    }

    let role: UserRole = "student";
    // Derive a clean, human name from the email (e.g. rohan.christopher@gmail.com -> Rohan Christopher)
    const derivedName = email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    let name = derivedName || "Student Candidate";

    if (email.includes("parent")) {
      role = "parent";
      name = derivedName ? `${derivedName} (Parent)` : "Parent Guardian";
    } else if (email.includes("pro") || email.includes("mckinsey")) {
      role = "professional";
      name = derivedName || "Professional Candidate";
    } else if (email.includes("admin")) {
      role = "admin";
      name = "Academic Administrator";
    }

    const authUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatarUrl: DEFAULT_USER_PROFILE.avatarUrl,
      role,
      isEmailVerified: true,
      onboarded: true,
      institution: "Academy",
      createdAt: new Date().toISOString(),
    };

    setIsAuthenticated(true);
    setCurrentUser(authUser);
    setProfile((prev) => ({
      ...prev,
      name,
      email,
      activeRole: role,
    }));

    if (rememberMe) {
      try {
        localStorage.setItem("acuity_auth", "true");
        localStorage.setItem("acuity_user", JSON.stringify(authUser));
      } catch (e) {}
    }

    return { success: true };
  };

  const loginWithGoogle = async () => {
    const authUser: AuthUser = {
      id: `usr-google-${Date.now()}`,
      name: profile.name || "Student Candidate",
      email: profile.email || "candidate@acuitysystems.edu",
      avatarUrl: DEFAULT_USER_PROFILE.avatarUrl,
      role: "student",
      isEmailVerified: true,
      onboarded: true,
      institution: "Academy",
      createdAt: new Date().toISOString(),
    };

    setIsAuthenticated(true);
    setCurrentUser(authUser);
    try {
      localStorage.setItem("acuity_auth", "true");
      localStorage.setItem("acuity_user", JSON.stringify(authUser));
    } catch (e) {}
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required." };
    }

    const authUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      role,
      isEmailVerified: false,
      onboarded: false,
      createdAt: new Date().toISOString(),
    };

    setIsAuthenticated(true);
    setCurrentUser(authUser);
    setProfile((prev) => ({
      ...prev,
      name,
      email,
      activeRole: role,
    }));

    try {
      localStorage.setItem("acuity_auth", "true");
      localStorage.setItem("acuity_user", JSON.stringify(authUser));
    } catch (e) {}

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      localStorage.setItem("acuity_auth", "false");
      localStorage.removeItem("acuity_user");
    } catch (e) {}
  };

  const forgotPassword = async (email: string) => {
    return { success: true };
  };

  const resetPassword = async (password: string) => {
    return { success: true };
  };

  const verifyEmail = async (code: string) => {
    if (currentUser) {
      const updated = { ...currentUser, isEmailVerified: true };
      setCurrentUser(updated);
      saveState("acuity_user", updated);
    }
    return { success: true };
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, onboarded: true };
      setCurrentUser(updatedUser);
      saveState("acuity_user", updatedUser);
    }
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      saveState("acuity_profile", updated);
      return updated;
    });
  };

  const setActiveRole = (role: UserRole) => {
    setProfile((prev) => {
      const updated = { ...prev, activeRole: role };
      saveState("acuity_profile", updated);
      return updated;
    });
    if (currentUser) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      saveState("acuity_user", updatedUser);
    }
  };

  const setSelectedExam = (examId: SupportedExamId) => {
    setProfile((prev) => {
      const updated = { ...prev, selectedExam: examId };
      saveState("acuity_profile", updated);
      return updated;
    });
  };

  const submitTestResult = (result: TestAttemptResult) => {
    setTestResults((prev) => {
      const updated = [result, ...prev];
      saveState("acuity_results", updated);
      return updated;
    });

    setProfile((prev) => {
      const updated = {
        ...prev,
        totalStudyHours: Number((prev.totalStudyHours + result.timeSpentSeconds / 3600).toFixed(1)),
      };
      saveState("acuity_profile", updated);
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
      saveState("acuity_cards", updated);
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
      saveState("acuity_cards", updated);
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
      saveState("acuity_tasks", updated);
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
      saveState("acuity_tasks", updated);
      return updated;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== taskId);
      saveState("acuity_tasks", updated);
      return updated;
    });
  };

  const toggleScheduleBlock = (blockId: string) => {
    setScheduleBlocks((prev) => {
      const updated = prev.map((b) =>
        b.id === blockId ? { ...b, completed: !b.completed } : b
      );
      saveState("acuity_schedule_blocks", updated);
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
        user: "Academic Reviewer",
        details: `Item #${questionId} approved into active question bank.`,
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
        isAuthenticated,
        currentUser,
        login,
        loginWithGoogle,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        completeOnboarding,
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
        toggleScheduleBlock,
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
