import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../../components/atoms";
import { FilterContainer, RadioButtonLine } from "../../components/moleculas";
import { Button } from "../../components/atoms";
import type { Platform, Category, SortType } from "../../../lib/api/types";
import { categories, platforms, sortBy } from "./utils";
import { CheckBoxLine } from "../../components/moleculas/CheckBoxLine";
import { useApp, useToast } from "../../../lib/hooks";

import { RootRoutes, RootStackScreenProps } from "../../navigation/types";
import { TOASTER_STATUS } from "../../../lib/core/ToastProvider";

export const FilterScreen = ({
  navigation,
  route,
}: RootStackScreenProps<RootRoutes.FILTERS>) => {
  const [activePlatform, setActivePlatform] = useState<Platform>("all");
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [activeSort, setActiveSort] = useState<SortType>();
  const [isLoading, setIsLoading] = useState(false);

  const app = useApp();
  const { add } = useToast();

  useEffect(() => {
    if (!route.params) {
      return;
    }
    const {
      activeCategories: c,
      activePlatform: p,
      activeSort: s,
    } = route.params;

    c && setActiveCategories(c);
    p && setActivePlatform(p);
    s && setActiveSort(s);
  }, []);

  const handleSelectPlatform = (platform: Platform) => {
    setActivePlatform(platform);
  };

  const handleSelectCategory = (category: Category) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(prev => prev.filter(c => c !== category));
      return;
    }

    setActiveCategories([...activeCategories, category]);
  };

  const handleSelectSort = (sort: SortType) => {
    setActiveSort(sort);
  };

  const handleApply = useCallback(async () => {
    setIsLoading(true);

    try {
      const games = await app.games.getAll({
        category: activeCategories.join("."),
        "sort-by": activeSort,
        platform: activePlatform,
      });
      setIsLoading(false);

      navigation.navigate(RootRoutes.HOME, {
        games,
        activeCategories,
        activePlatform,
        activeSort,
      });
    } catch (e) {
      const error = e as Error;
      setIsLoading(false);
      add({
        message: error.message,
        status: TOASTER_STATUS.ERROR,
        duration: 5000,
      });
    }
  }, [activeCategories, activePlatform, activeSort]);

  return (
    <Screen insetsTop paddingHorizontal insetsBottom>
      <FilterContainer
        title="Platform: "
        contentContainerStyle={styles.filtersWrapper}>
        {platforms.map(({ key, value }) => (
          <RadioButtonLine
            key={`filter-by-platform-item=#${key}`}
            text={value}
            isActive={activePlatform === key}
            containerStyle={styles.radioLine}
            onPress={() => handleSelectPlatform(key)}
          />
        ))}
      </FilterContainer>

      <FilterContainer
        title="Category: "
        contentContainerStyle={styles.filtersWrapper}>
        {categories.map(({ key, value }) => (
          <CheckBoxLine
            key={`filter-by-platform-item=#${key}`}
            text={value}
            isActive={activeCategories.includes(key)}
            containerStyle={styles.radioLine}
            onPress={() => handleSelectCategory(key)}
          />
        ))}
      </FilterContainer>

      <FilterContainer
        title="Sort by: "
        contentContainerStyle={styles.filtersWrapper}>
        {sortBy.map(({ key, value }) => (
          <RadioButtonLine
            key={`filter-by-platform-item=#${key}`}
            text={value}
            isActive={activeSort === key}
            containerStyle={styles.radioLine}
            onPress={() => handleSelectSort(key)}
          />
        ))}
      </FilterContainer>
      <Button
        style={styles.applyButton}
        onPress={handleApply}
        isLoading={isLoading}>
        Apply Changes
      </Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  applyButton: {
    marginTop: "auto",
  },
  radioLine: {
    marginBottom: 8,
    marginRight: 17,
  },
  filtersWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
