import { Page } from './Page';
import Tools from './Tools';
import { LocalStore } from './LocalStore';
import { Callback } from './Callback';
import { templateToComponment } from './templateParse';
import { CallPanel, watchPanelEvent } from './CallPanel';
import { useTips, tips } from './Tips';
import { usePageScroller } from './PageScroller';

export default Page;
export {
  LocalStore,
  Callback,
  CallPanel,
  watchPanelEvent,
  Page,
  useTips,
  tips,
  Tools,
  usePageScroller,
  templateToComponment
};
