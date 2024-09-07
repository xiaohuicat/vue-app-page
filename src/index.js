import { Page } from './Page';
import Tools from './Tools';
import { LocalStore } from './LocalStore';
import { Callback } from './Callback';
import { templateToComponment } from './templateParse';
import { CallPanel, watchPanelEvent } from './CallPanel';
import { useTips, tips } from './Tips';
import { usePageScroller } from './PageScroller';
import { RangeTask } from './RangeTask';
import { ElementEvents } from './ElementEvents';

export default Page;
export {
  LocalStore,
  Callback,
  CallPanel,
  RangeTask,
  ElementEvents,
  watchPanelEvent,
  Page,
  useTips,
  tips,
  Tools,
  usePageScroller,
  templateToComponment
};
