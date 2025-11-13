import { useState } from "react";
import { CameraPreview } from "./components/CameraPreview";
import { LiveCameraDialog } from "./components/LiveCameraDialog";
import { NotificationsList } from "./components/NotificationsList";
import { CameraNotifications } from "./components/CameraNotifications";
import { Settings } from "./components/Settings";
import { NetworkStatus } from "./components/NetworkStatus";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Video, Bell, Baby, ListCollapse, Settings as SettingsIcon, Wifi, Activity, AlertTriangle, VideoOff, ArrowLeft } from "lucide-react";
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

interface AppLayout3Props {
  onBack?: () => void;
}

export default function AppLayout3({ onBack }: AppLayout3Props) {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>("cameras");

  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    setDialogOpen(true);
  };

  const activeCameras = cameras.filter(c => c.status === "ativa").length;
  const alertCameras = cameras.filter(c => c.status === "alerta").length;
  const inactiveCameras = cameras.filter(c => c.status === "inativa").length;

  const menuItems = [
    { id: "cameras" as TabValue, icon: Video, label: "Câmeras", badge: cameras.length },
    { id: "notifications" as TabValue, icon: Bell, label: "Notificações", badge: 6 },
    { id: "events" as TabValue, icon: ListCollapse, label: "Eventos" },
    { id: "settings" as TabValue, icon: SettingsIcon, label: "Configurações" },
    { id: "network" as TabValue, icon: Wifi, label: "Rede" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600">
          <div className="container mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Plagia Logo" className="w-10 h-10" />
                <div>
                  <p className="text-white text-sm">Gestão Inteligente de Granjas Suínas</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <p className="text-white text-xs">Dashboard Maternidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-xl shadow-lg">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl">Maternidade</h1>
                <p className="text-sm text-gray-600">Sistema de Monitoramento de Nascimento de Leitões</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-3">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-green-600">Ativas</p>
                      <p className="text-lg text-green-700">{activeCameras}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {alertCameras > 0 && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 animate-pulse" />
                      <div>
                        <p className="text-xs text-yellow-600">Alertas</p>
                        <p className="text-lg text-yellow-700">{alertCameras}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {inactiveCameras > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <VideoOff className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-xs text-red-600">Inativas</p>
                        <p className="text-lg text-red-700">{inactiveCameras}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Cards */}
      <div className="container mx-auto px-4 md:px-6 py-6">
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative p-4 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs md:text-sm">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={isActive ? "secondary" : "default"}
                      className={`absolute -top-2 -right-2 ${
                        !isActive && item.id === "notifications" ? "bg-red-500" : ""
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === "cameras" && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2">Monitoramento em Tempo Real</h2>
                <p className="text-gray-600 text-sm">
                  Clique em qualquer câmera para acompanhar a transmissão ao vivo
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

          {activeTab === "notifications" && (
            <div>
              <div className="mb-4">
                <h2 className="mb-1">Central de Notificações</h2>
                <p className="text-sm text-gray-600">Acompanhe todos os eventos importantes do sistema</p>
              </div>
              <NotificationsList />
            </div>
          )}

          {activeTab === "events" && (
            <div>
              <div className="mb-4">
                <h2 className="mb-1">Eventos por Câmera</h2>
                <p className="text-sm text-gray-600">Histórico detalhado de eventos em cada baia</p>
              </div>
              <CameraNotifications />
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <div className="mb-4">
                <h2 className="mb-1">Configurações do Sistema</h2>
                <p className="text-sm text-gray-600">Gerencie câmeras e preferências</p>
              </div>
              <Settings />
            </div>
          )}

          {activeTab === "network" && (
            <div>
              <div className="mb-4">
                <h2 className="mb-1">Status da Rede</h2>
                <p className="text-sm text-gray-600">Monitore a conexão e qualidade do sinal</p>
              </div>
              <NetworkStatus />
            </div>
          )}
        </div>
      </div>

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