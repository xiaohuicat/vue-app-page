import { Page } from './Page';
import Tools from './Tools';
import { LocalStore } from './LocalStore';
import { Callback } from './Callback';
import { templateToComponment } from './templateParse';
import { useTips, tips } from './Tips';
import { useScroll } from './Scroll';
import { RangeTask } from './RangeTask';
import { ElementEvents } from './ElementEvents';
import { createStore, useStore, clearStore } from './Store';
import { Phone, watchPhone } from './Phone';
import { CallPanel, watchPanel } from './CallPanel';

export default Page;
export {
  LocalStore,
  Callback,
  RangeTask,
  ElementEvents,
  Page,
  useTips,
  tips,
  Tools,
  useScroll,
  useStore,
  createStore,
  clearStore,
  Phone,
  watchPhone,
  CallPanel,
  watchPanel,
  templateToComponment
};
