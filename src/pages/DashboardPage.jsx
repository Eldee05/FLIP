import { useStore } from "../store/useStore";

import Topbar from "../components/layout/Topbar.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import ChatWidget from "../components/shared/ChatWidget.jsx";

import OverviewTab from "../components/tabs/OverViewTab.jsx";
import {
  CasesTab,
  HearingsTab,
  NotificationsTab,
  AnalyticsTab,
  ProfileTab,
  ResourcesTab,
  RightsTab,
  HelpTab,
} from "../components/tabs/OtherTabs.jsx";
import SolicitorsTab from "../components/tabs/SolicitorsTab.jsx";
import MessagesTab from "../components/tabs/MessageTab.jsx";
import DocumentsTab from "../components/tabs/DocumentsTab.jsx";

// Wallet is intentionally NOT in TAB_MAP — it opens as a modal from Topbar
const TAB_MAP = {
  overview: OverviewTab,
  cases: CasesTab,
  solicitors: SolicitorsTab,
  hearings: HearingsTab,
  documents: DocumentsTab,
  notifications: NotificationsTab,
  messages: MessagesTab,
  analytics: AnalyticsTab,
  profile: ProfileTab,
  resources: ResourcesTab,
  rights: RightsTab,
  help: HelpTab,
};

export default function DashboardPage() {
  const { activeTab } = useStore();
  const TabComponent = TAB_MAP[activeTab] || OverviewTab;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main
          id="main-content"
          style={{
            flex: 1,
            padding: "28px 32px",
            overflowY: "auto",
            minWidth: 0,
          }}
        >
          <TabComponent />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
