import { useState, useEffect, useMemo, useCallback } from "react";

const POINTS_STORAGE_KEY = "knowledgebase-points";
const THEME_STORAGE_KEY = "knowledgebase-bookshelf-theme";
const UNLOCK_STORAGE_KEY = "knowledgebase-bookshelf-unlocked";

export const useBookshelfCustomization = () => {
  const [points, setPoints] = useState(() => {
    const stored = localStorage.getItem(POINTS_STORAGE_KEY);
    return stored ? Number(stored) : 120;
  });

  const [bookshelfTheme, setBookshelfTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          shelf: "classic",
          background: "dawn",
        };
  });

  const [unlockedCustomizations, setUnlockedCustomizations] = useState(() => {
    const stored = localStorage.getItem(UNLOCK_STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          shelf: ["classic"],
          background: ["dawn"],
        };
  });

  const bookshelfOptions = useMemo(
    () => ({
      shelf: [
        {
          id: "classic",
          name: "Classic Oak",
          cost: 0,
          preview: "linear-gradient(145deg, #7b593e, #4a2f1f)",
        },
        {
          id: "modern",
          name: "Modern Slate",
          cost: 30,
          preview: "linear-gradient(135deg, #4b4b6a, #22223b)",
        },
        {
          id: "aurora",
          name: "Aurora Glow",
          cost: 45,
          preview: "linear-gradient(135deg, #5b8def, #8146ff)",
        },
      ],
      background: [
        {
          id: "dawn",
          name: "Dawn Light",
          cost: 0,
          preview: "radial-gradient(circle at top, #ffe29f, #ffa99f)",
        },
        {
          id: "night",
          name: "Night Sky",
          cost: 25,
          preview: "radial-gradient(circle at 20% 20%, #2d2a4a, #0d0a1a)",
        },
        {
          id: "forest",
          name: "Forest Glow",
          cost: 40,
          preview: "radial-gradient(circle at 30% 30%, #8ec5fc, #3ba66b)",
        },
      ],
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem(POINTS_STORAGE_KEY, String(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(bookshelfTheme));
  }, [bookshelfTheme]);

  useEffect(() => {
    localStorage.setItem(
      UNLOCK_STORAGE_KEY,
      JSON.stringify(unlockedCustomizations)
    );
  }, [unlockedCustomizations]);

  const getPreviewStyle = useCallback(
    (type, id) => {
      const option = bookshelfOptions[type].find((item) => item.id === id);
      return option?.preview || "";
    },
    [bookshelfOptions]
  );

  const handleApplyCustomization = useCallback(
    (category, option) => {
      if (bookshelfTheme[category] === option.id) return;

      const alreadyUnlocked = unlockedCustomizations[category]?.includes(
        option.id
      );

      if (!alreadyUnlocked && option.cost > 0 && points < option.cost) {
        return;
      }

      if (!alreadyUnlocked && option.cost > 0) {
        setPoints((prev) => prev - option.cost);
        setUnlockedCustomizations((prev) => ({
          ...prev,
          [category]: [...new Set([...(prev[category] || []), option.id])],
        }));
      }

      setBookshelfTheme((prev) => ({ ...prev, [category]: option.id }));
    },
    [bookshelfTheme, unlockedCustomizations, points]
  );

  return {
    points,
    bookshelfTheme,
    unlockedCustomizations,
    bookshelfOptions,
    handleApplyCustomization,
    getPreviewStyle,
  };
};
