import { useState } from "react";
import { CameraPreview } from "./components/CameraPreview";
import { LiveCameraDialog } from "./components/LiveCameraDialog";
import { NotificationsList } from "./components/NotificationsList";
import { CameraNotifications } from "./components/CameraNotifications";
import { Settings } from "./components/Settings";
import { NetworkStatus } from "./components/NetworkStatus";
import { Badge } from "./components/ui/badge";
import { Video, Bell, Baby, ListCollapse, Settings as SettingsIcon, Wifi, Menu, X, ArrowLeft } from "lucide-react";
import { Button } from "./components/ui/button";
import logo from "figma:asset/c50c987984479f23ce980848ecdb2fa765748d7b.png";

interface Camera {
  id: number;
  name: string;
  status: "ativa" | "alerta" | "inativa";
  lastActivity?: string;
  imageUrl: string;
}

const cameras: Camera[] = [
  {
    id: 1,
    name: "Câmera 1 - Baia A",
    status: "ativa",
    lastActivity: "Última atividade: Há 10 min",
    imageUrl: "https://images.unsplash.com/photo-1762655338189-58dd9a5bea18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 2,
    name: "Câmera 2 - Baia B",
    status: "ativa",
    lastActivity: "Última atividade: Há 25 min",
    imageUrl: "https://images.unsplash.com/photo-1663784294206-9b508132baf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 3,
    name: "Câmera 3 - Baia C",
    status: "alerta",
    lastActivity: "⚠️ Atividade detectada agora",
    imageUrl: "https://images.unsplash.com/photo-1757323148943-2ae82a19ec9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 4,
    name: "Câmera 4 - Baia D",
    status: "ativa",
    lastActivity: "Última atividade: Há 1 hora",
    imageUrl: "https://images.unsplash.com/photo-1762655338189-58dd9a5bea18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 5,
    name: "Câmera 5 - Baia E",
    status: "alerta",
    lastActivity: "⚠️ Temperatura elevada",
    imageUrl: "https://images.unsplash.com/photo-1663784294206-9b508132baf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 6,
    name: "Câmera 6 - Baia F",
    status: "inativa",
    lastActivity: "❌ Sem conexão - Verificar câmera",
    imageUrl: "https://images.unsplash.com/photo-1757323148943-2ae82a19ec9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: 7,
    name: "Câmera 7 - Baia G",
    status: "ativa",
    lastActivity: "Última atividade: Há 2 horas",
    imageUrl: "https://images.unsplash.com/photo-1762655338189-58dd9a5bea18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

type TabValue = "cameras" | "notifications" | "events" | "settings" | "network";

interface AppLayout2Props {
  onBack?: () => void;
}

export default function AppLayout2({ onBack }: AppLayout2Props) {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>("cameras");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    setDialogOpen(true);
  };

  const activeCameras = cameras.filter(c => c.status === "ativa").length;
  const alertCameras = cameras.filter(c => c.status === "alerta").length;
  const inactiveCameras = cameras.filter(c => c.status === "inativa").length;

  const menuItems = [
    { id: "cameras" as TabValue, icon: Video, label: "Câmeras", badge: cameras.length },
    { id: "notifications" as TabValue, icon: Bell, label: "Notificações", badge: 6, variant: "destructive" as const },
    { id: "events" as TabValue, icon: ListCollapse, label: "Eventos" },
    { id: "settings" as TabValue, icon: SettingsIcon, label: "Configurações" },
    { id: "network" as TabValue, icon: Wifi, label: "Rede" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        {/* Logo */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="Plagia Logo" className="w-10 h-10" />
            <div>
              <p className="text-white text-sm">Gestão Inteligente de</p>
              <p className="text-white text-sm">Granjas Suínas</p>
            </div>
          </div>
        </div>

        {/* Module info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Baby className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h2 className="text-sm">Maternidade</h2>
              <p className="text-xs text-gray-600">Monitoramento</p>
            </div>
          </div>
        </div>

        {/* Status summary */}
        <div className="p-4 border-b border-gray-200 space-y-2">
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <span className="text-xs text-green-700">Ativas</span>
            <span className="text-sm text-green-700">{activeCameras}</span>
          </div>
          {alertCameras > 0 && (
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
              <span className="text-xs text-yellow-700">Alertas</span>
              <span className="text-sm text-yellow-700">{alertCameras}</span>
            </div>
          )}
          {inactiveCameras > 0 && (
            <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
              <span className="text-xs text-red-700">Inativas</span>
              <span className="text-sm text-red-700">{inactiveCameras}</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    {item.badge && (
                      <Badge variant={item.variant || "secondary"} className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-64 bg-white z-40 lg:hidden shadow-xl">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Plagia Logo" className="w-10 h-10" />
                  <div>
                    <p className="text-white text-sm">Gestão Inteligente de</p>
                    <p className="text-white text-sm">Granjas Suínas</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:bg-blue-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Baby className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-sm">Maternidade</h2>
                  <p className="text-xs text-gray-600">Monitoramento</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200 space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <span className="text-xs text-green-700">Ativas</span>
                <span className="text-sm text-green-700">{activeCameras}</span>
              </div>
              {alertCameras > 0 && (
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                  <span className="text-xs text-yellow-700">Alertas</span>
                  <span className="text-sm text-yellow-700">{alertCameras}</span>
                </div>
              )}
              {inactiveCameras > 0 && (
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-xs text-red-700">Inativas</span>
                  <span className="text-sm text-red-700">{inactiveCameras}</span>
                </div>
              )}
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left text-sm">{item.label}</span>
                        {item.badge && (
                          <Badge variant={item.variant || "secondary"} className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600">
            <div className="px-4 py-2">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="text-white hover:bg-blue-600"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <img src={logo} alt="Plagia Logo" className="w-8 h-8" />
                <p className="text-white text-xs">Gestão Inteligente de Granjas Suínas</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Baby className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h1 className="text-sm">Maternidade</h1>
                <p className="text-xs text-gray-600">Monitoramento de Leitões</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          {onBack && (
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Trocar Layout
              </Button>
            </div>
          )}

          {activeTab === "cameras" && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2">Monitoramento em Tempo Real</h2>
                <p className="text-gray-600 text-sm">
                  Clique em qualquer câmera para acompanhar a transmissão ao vivo
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {cameras.map((camera) => (
                  <CameraPreview
                    key={camera.id}
                    id={camera.id}
                    name={camera.name}
                    status={camera.status}
                    lastActivity={camera.lastActivity}
                    imageUrl={camera.imageUrl}
                    onClick={() => handleCameraClick(camera)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && <NotificationsList />}
          {activeTab === "events" && <CameraNotifications />}
          {activeTab === "settings" && <Settings />}
          {activeTab === "network" && <NetworkStatus />}
        </div>
      </main>

      {/* Live camera dialog */}
      {selectedCamera && (
        <LiveCameraDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          cameraName={selectedCamera.name}
          cameraId={selectedCamera.id}
          imageUrl={selectedCamera.imageUrl}
          status={selectedCamera.status}
        />
      )}
    </div>
  );
}