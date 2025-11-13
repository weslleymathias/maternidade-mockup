import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { CameraPreview } from "./components/CameraPreview";
import { LiveCameraDialog } from "./components/LiveCameraDialog";
import { NotificationsList } from "./components/NotificationsList";
import { CameraNotifications } from "./components/CameraNotifications";
import { Settings } from "./components/Settings";
import { NetworkStatus } from "./components/NetworkStatus";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Video, Bell, Baby, ListCollapse, Settings as SettingsIcon, Wifi, ArrowLeft } from "lucide-react";
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

interface AppLayout1Props {
  onBack?: () => void;
}

export default function AppLayout1({ onBack }: AppLayout1Props) {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    setDialogOpen(true);
  };

  const activeCameras = cameras.filter(c => c.status === "ativa").length;
  const alertCameras = cameras.filter(c => c.status === "alerta").length;
  const inactiveCameras = cameras.filter(c => c.status === "inativa").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        {/* Company branding */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600">
          <div className="container mx-auto px-4 md:px-6 py-2 md:py-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img src={logo} alt="Plagia Logo" className="w-8 h-8 md:w-10 md:h-10" />
              <div className="text-center md:text-left">
                <p className="text-white text-xs md:text-sm">Gestão Inteligente de Granjas Suínas</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Module header */}
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <div className="bg-pink-100 p-2 rounded-lg shrink-0">
                <Baby className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base md:text-xl truncate">Maternidade</h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Sistema de Monitoramento de Nascimento de Leitões</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs md:text-sm text-green-700">{activeCameras}</span>
              </div>
              {alertCameras > 0 && (
                <div className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm text-yellow-700">{alertCameras}</span>
                </div>
              )}
              {inactiveCameras > 0 && (
                <div className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs md:text-sm text-red-700">{inactiveCameras}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
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
        
        <Tabs defaultValue="cameras" className="w-full">
          <div className="w-full overflow-x-auto mb-8 -mx-4 md:mx-0 px-4 md:px-0">
            <TabsList className="inline-flex w-auto min-w-full md:grid md:w-full md:max-w-4xl md:grid-cols-5 h-auto md:h-10">
              <TabsTrigger value="cameras" className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap px-3 md:px-4">
                <Video className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Câmeras</span>
                <Badge variant="secondary" className="ml-1">{cameras.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap px-3 md:px-4">
                <Bell className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Notificações</span>
                <Badge variant="destructive" className="ml-1">6</Badge>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap px-3 md:px-4">
                <ListCollapse className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Eventos</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap px-3 md:px-4">
                <SettingsIcon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Config</span>
              </TabsTrigger>
              <TabsTrigger value="network" className="flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap px-3 md:px-4">
                <Wifi className="w-4 h-4 shrink-0" />
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cameras" className="space-y-6">
            <div>
              <h2 className="mb-4">Monitoramento em Tempo Real</h2>
              <p className="text-gray-600 mb-6">
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
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsList />
          </TabsContent>

          <TabsContent value="events">
            <CameraNotifications />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>

          <TabsContent value="network">
            <NetworkStatus />
          </TabsContent>
        </Tabs>
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