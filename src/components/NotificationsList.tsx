import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Bell, AlertTriangle, CheckCircle, Info, Calendar } from "lucide-react";
import { Card } from "./ui/card";

interface Notification {
  id: number;
  type: "alerta" | "sucesso" | "info";
  title: string;
  description: string;
  camera?: string;
  timestamp: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "alerta",
    title: "Atividade Detectada - Possível Nascimento",
    description: "Movimento intenso detectado na baia. Recomenda-se verificação imediata.",
    camera: "Câmera 3 - Baia C",
    timestamp: "Há 5 minutos"
  },
  {
    id: 2,
    type: "sucesso",
    title: "Nascimento Confirmado",
    description: "Leitão nascido com sucesso. Total de 8 leitões nesta ninhada.",
    camera: "Câmera 1 - Baia A",
    timestamp: "Há 1 hora"
  },
  {
    id: 3,
    type: "alerta",
    title: "Temperatura Elevada",
    description: "Temperatura ambiente acima do ideal na baia. Verificar sistema de climatização.",
    camera: "Câmera 5 - Baia E",
    timestamp: "Há 2 horas"
  },
  {
    id: 4,
    type: "info",
    title: "Manutenção Programada",
    description: "Limpeza e verificação das câmeras agendada para amanhã às 08:00.",
    timestamp: "Hoje, 10:30"
  },
  {
    id: 5,
    type: "sucesso",
    title: "Sistema Online",
    description: "Todas as câmeras estão funcionando normalmente. Última verificação concluída.",
    timestamp: "Há 3 horas"
  },
  {
    id: 6,
    type: "alerta",
    title: "Porca Agitada",
    description: "Comportamento anormal detectado. Possível início de trabalho de parto.",
    camera: "Câmera 7 - Baia G",
    timestamp: "Há 4 horas"
  }
];

export function NotificationsList() {
  const getIcon = (type: string) => {
    switch (type) {
      case "alerta":
        return <AlertTriangle className="w-5 h-5" />;
      case "sucesso":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getVariant = (type: string): "default" | "destructive" => {
    return type === "alerta" ? "destructive" : "default";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <h2>Notificações Importantes</h2>
        </div>
        <Badge variant="secondary">{notifications.length} notificações</Badge>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              <div className={notification.type === "alerta" ? "text-red-600" : notification.type === "sucesso" ? "text-green-600" : "text-blue-600"}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm">{notification.title}</h3>
                  <Badge variant={getVariant(notification.type)} className="text-xs shrink-0">
                    {notification.type === "alerta" ? "Alerta" : notification.type === "sucesso" ? "Sucesso" : "Info"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{notification.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  {notification.camera && (
                    <span className="flex items-center gap-1">
                      📹 {notification.camera}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {notification.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
