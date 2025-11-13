import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Wifi, WifiOff, Signal, Router, Video } from "lucide-react";
import { Progress } from "./ui/progress";

interface CameraConnection {
  id: number;
  name: string;
  status: "online" | "offline" | "weak";
  signalStrength: number;
  latency: number;
}

const cameraConnections: CameraConnection[] = [
  { id: 1, name: "Câmera 1 - Baia A", status: "online", signalStrength: 95, latency: 12 },
  { id: 2, name: "Câmera 2 - Baia B", status: "online", signalStrength: 88, latency: 18 },
  { id: 3, name: "Câmera 3 - Baia C", status: "online", signalStrength: 92, latency: 15 },
  { id: 4, name: "Câmera 4 - Baia D", status: "weak", signalStrength: 45, latency: 65 },
  { id: 5, name: "Câmera 5 - Baia E", status: "online", signalStrength: 90, latency: 14 },
  { id: 6, name: "Câmera 6 - Baia F", status: "online", signalStrength: 87, latency: 20 },
  { id: 7, name: "Câmera 7 - Baia G", status: "online", signalStrength: 93, latency: 11 }
];

export function NetworkStatus() {
  const onlineCameras = cameraConnections.filter(c => c.status === "online").length;
  const weakCameras = cameraConnections.filter(c => c.status === "weak").length;
  const offlineCameras = cameraConnections.filter(c => c.status === "offline").length;
  const avgSignal = Math.round(
    cameraConnections.reduce((acc, cam) => acc + cam.signalStrength, 0) / cameraConnections.length
  );

  const getSignalIcon = (strength: number) => {
    if (strength >= 80) return <Wifi className="w-5 h-5 text-green-600" />;
    if (strength >= 50) return <Signal className="w-5 h-5 text-yellow-600" />;
    return <WifiOff className="w-5 h-5 text-red-600" />;
  };

  const getSignalColor = (strength: number) => {
    if (strength >= 80) return "bg-green-500";
    if (strength >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-600">Online</Badge>;
      case "weak":
        return <Badge className="bg-yellow-600">Sinal Fraco</Badge>;
      case "offline":
        return <Badge variant="destructive">Offline</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Wifi className="w-6 h-6 text-blue-600" />
        <div>
          <h2>Status de Conexão</h2>
          <p className="text-sm text-gray-600">Monitoramento de rede e conectividade das câmeras</p>
        </div>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Online</p>
              <p className="text-2xl">{onlineCameras}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Signal className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sinal Fraco</p>
              <p className="text-2xl">{weakCameras}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <WifiOff className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Offline</p>
              <p className="text-2xl">{offlineCameras}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Router className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sinal Médio</p>
              <p className="text-2xl">{avgSignal}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Network Info */}
      <Card className="p-6">
        <h3 className="mb-4">Informações de Rede</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Endereço IP</p>
            <p className="text-lg">192.168.1.100</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rede</p>
            <p className="text-lg">Maternidade_Fazenda</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Largura de Banda</p>
            <p className="text-lg">100 Mbps</p>
          </div>
        </div>
      </Card>

      {/* Individual Camera Status */}
      <Card className="p-6">
        <h3 className="mb-4">Status Individual das Câmeras</h3>
        <div className="space-y-4">
          {cameraConnections.map((camera) => (
            <div key={camera.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <Video className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p>{camera.name}</p>
                    <p className="text-sm text-gray-600">Latência: {camera.latency}ms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getSignalIcon(camera.signalStrength)}
                  {getStatusBadge(camera.status)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Força do Sinal</span>
                  <span>{camera.signalStrength}%</span>
                </div>
                <div className="relative">
                  <Progress value={camera.signalStrength} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full ${getSignalColor(camera.signalStrength)} transition-all`}
                    style={{ width: `${camera.signalStrength}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Signal className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm">
              <strong>Dica:</strong> Para melhorar o sinal das câmeras com conectividade fraca, 
              considere reposicionar o roteador ou adicionar um repetidor de sinal próximo às baias afetadas.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
