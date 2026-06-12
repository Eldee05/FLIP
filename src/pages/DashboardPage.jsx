import { useState } from "react";
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

// Wallet opens as a modal from Topbar — not a tab
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

  // Controls the mobile sidebar drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Topbar receives onMenuOpen to trigger the drawer */}
      <Topbar onMenuOpen={() => setDrawerOpen(true)} />

      <div style={{ display: "flex" }}>
        {/* Sidebar receives drawer state + close handler */}
        <Sidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Main content — takes full width on mobile */}
        <main
          id="main-content"
          className="dash-main"
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
