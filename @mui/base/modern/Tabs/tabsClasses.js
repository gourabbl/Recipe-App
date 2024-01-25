import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
export function getTabsUtilityClass(slot) {
  return generateUtilityClass('MuiTabs', slot);
}
export const tabsClasses = generateUtilityClasses('MuiTabs', ['root', 'horizontal', 'vertical']);