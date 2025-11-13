import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Video, Bell, Baby, ListCollapse, Settings as SettingsIcon, Wifi, ArrowLeft } from "lucide-react";

interface Camera {
  id: number;
  name: string;
  status: "ativa" | "alerta" | "inativa";
}

const cameras: Camera[] = [
  { id: 1, name: "Câmera 1 - Baia A", status: "ativa" },
  { id: 2, name: "Câmera 2 - Baia B", status: "ativa" },
  { id: 3, name: "Câmera 3 - Baia C", status: "alerta" },
  { id: 4, name: "Câmera 4 - Baia D", status: "ativa" },
  { id: 5, name: "Câmera 5 - Baia E", status: "alerta" },
  { id: 6, name: "Câmera 6 - Baia F", status: "inativa" },
  { id: 7, name: "Câmera 7 - Baia G", status: "ativa" }
];

interface AppLayout4Props {
  onBack?: () => void;
}

export default function AppLayout4({ onBack }: AppLayout4Props) {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);

  const activeCameras = cameras.filter(c => c.status === "ativa").length;
  const alertCameras = cameras.filter(c => c.status === "alerta").length;
  const inactiveCameras = cameras.filter(c => c.status === "inativa").length;

  const getStatusColor = (status: string) => {
    if (status === "ativa") return "bg-gray-400";
    if (status === "alerta") return "bg-gray-500";
    return "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Wireframe style */}
      <header className="bg-white border-b-2 border-gray-400">
        {/* Company branding placeholder */}
        <div className="bg-gray-800">
          <div className="container mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded"></div>
              <div className="text-center md:text-left">
                <div className="h-4 w-48 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Module header */}
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-gray-300 p-3 rounded-lg border-2 border-gray-400">
                <Baby className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-700 rounded mb-1"></div>
                <div className="h-3 w-64 bg-gray-400 rounded hidden sm:block"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-400 rounded">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm">{activeCameras}</span>
              </div>
              {alertCameras > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-400 rounded">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-sm">{alertCameras}</span>
                </div>
              )}
              {inactiveCameras > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-400 rounded">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">{inactiveCameras}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        {onBack && (
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onBack}
              className="gap-2 border-2 border-gray-400 hover:border-gray-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Trocar Layout
            </Button>
          </div>
        )}

        <Tabs defaultValue="cameras" className="w-full">
          <div className="w-full overflow-x-auto mb-8">
            <TabsList className="inline-flex w-auto min-w-full md:grid md:w-full md:max-w-4xl md:grid-cols-5 h-12 bg-white border-2 border-gray-400">
              <TabsTrigger 
                value="cameras" 
                className="flex items-center gap-2 data-[state=active]:bg-gray-300 border-r-2 border-gray-400"
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Câmeras</span>
                <Badge variant="secondary" className="ml-1 bg-gray-600 text-white">{cameras.length}</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center gap-2 data-[state=active]:bg-gray-300 border-r-2 border-gray-400"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notificações</span>
                <Badge variant="secondary" className="ml-1 bg-gray-600 text-white">6</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="flex items-center gap-2 data-[state=active]:bg-gray-300 border-r-2 border-gray-400"
              >
                <ListCollapse className="w-4 h-4" />
                <span className="hidden sm:inline">Eventos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2 data-[state=active]:bg-gray-300 border-r-2 border-gray-400"
              >
                <SettingsIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Config</span>
              </TabsTrigger>
              <TabsTrigger 
                value="network" 
                className="flex items-center justify-center gap-2 data-[state=active]:bg-gray-300"
              >
                <Wifi className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cameras" className="space-y-6">
            <div>
              <div className="h-8 w-64 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-96 bg-gray-400 rounded mb-6"></div>
            </div>
            
            {/* Wireframe camera grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cameras.map((camera) => (
                <div 
                  key={camera.id}
                  onClick={() => setSelectedCamera(camera.id)}
                  className={`bg-white border-2 ${
                    selectedCamera === camera.id ? 'border-gray-800' : 'border-gray-400'
                  } rounded-lg p-4 cursor-pointer hover:border-gray-600 transition-colors`}
                >
                  {/* Camera preview placeholder */}
                  <div className={`${getStatusColor(camera.status)} rounded-lg mb-3 flex items-center justify-center`}
                       style={{ aspectRatio: '16/9' }}>
                    <Video className="w-12 h-12 text-gray-200" />
                  </div>
                  
                  {/* Camera info */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-600 rounded"></div>
                    <div className="h-3 w-3/4 bg-gray-400 rounded"></div>
                    
                    {/* Status indicator */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className={`w-2 h-2 ${
                        camera.status === 'ativa' ? 'bg-gray-500' : 
                        camera.status === 'alerta' ? 'bg-gray-600' : 
                        'bg-gray-300'
                      } rounded-full`}></div>
                      <div className="h-3 w-20 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-4">
              <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
              
              {/* Notification items placeholder */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border-2 border-gray-400 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-full shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-gray-600 rounded"></div>
                      <div className="h-3 w-full bg-gray-400 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              <div className="h-8 w-56 bg-gray-700 rounded mb-6"></div>
              
              {/* Table placeholder */}
              <div className="bg-white border-2 border-gray-400 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200 border-b-2 border-gray-400">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-300">
                    <div className="h-3 bg-gray-400 rounded"></div>
                    <div className="h-3 bg-gray-400 rounded"></div>
                    <div className="h-3 bg-gray-400 rounded"></div>
                    <div className="h-3 bg-gray-400 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="h-8 w-40 bg-gray-700 rounded mb-6"></div>
              
              {/* Settings sections */}
              <div className="bg-white border-2 border-gray-400 rounded-lg p-6 space-y-4">
                <div className="h-5 w-48 bg-gray-600 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-400 rounded"></div>
                  <div className="h-4 w-full bg-gray-400 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-400 rounded-lg p-6 space-y-4">
                <div className="h-5 w-56 bg-gray-600 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-400 rounded"></div>
                  <div className="h-4 w-full bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="network">
            <div className="space-y-6">
              <div className="h-8 w-52 bg-gray-700 rounded mb-6"></div>
              
              {/* Network status cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border-2 border-gray-400 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 w-24 bg-gray-600 rounded mx-auto mb-2"></div>
                  <div className="h-4 w-32 bg-gray-400 rounded mx-auto"></div>
                </div>
                <div className="bg-white border-2 border-gray-400 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 w-20 bg-gray-600 rounded mx-auto mb-2"></div>
                  <div className="h-4 w-28 bg-gray-400 rounded mx-auto"></div>
                </div>
                <div className="bg-white border-2 border-gray-400 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 w-16 bg-gray-600 rounded mx-auto mb-2"></div>
                  <div className="h-4 w-24 bg-gray-400 rounded mx-auto"></div>
                </div>
              </div>

              {/* Connection list */}
              <div className="bg-white border-2 border-gray-400 rounded-lg p-6">
                <div className="h-5 w-40 bg-gray-600 rounded mb-4"></div>
                <div className="space-y-3">
                  {cameras.map((camera) => (
                    <div key={camera.id} className="flex items-center justify-between p-3 border-2 border-gray-300 rounded">
                      <div className="h-4 w-32 bg-gray-500 rounded"></div>
                      <div className={`w-3 h-3 ${getStatusColor(camera.status)} rounded-full`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}