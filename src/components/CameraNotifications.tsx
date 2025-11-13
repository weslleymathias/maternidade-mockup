import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Video, Baby, Skull, AlertTriangle, Clock } from "lucide-react";

interface NotificationEvent {
  id: number;
  type: "nascimento" | "morte" | "esmagamento";
  description: string;
  timestamp: string;
  count?: number;
}

interface CameraNotification {
  cameraId: number;
  cameraName: string;
  events: NotificationEvent[];
}

const cameraNotifications: CameraNotification[] = [
  {
    cameraId: 1,
    cameraName: "Câmera 1 - Baia A",
    events: [
      {
        id: 1,
        type: "nascimento",
        description: "Leitão nascido com sucesso",
        timestamp: "Hoje, 14:30",
        count: 1
      },
      {
        id: 2,
        type: "nascimento",
        description: "2 leitões nascidos",
        timestamp: "Hoje, 13:15",
        count: 2
      },
      {
        id: 3,
        type: "nascimento",
        description: "Leitão nascido com sucesso",
        timestamp: "Hoje, 11:20",
        count: 1
      }
    ]
  },
  {
    cameraId: 2,
    cameraName: "Câmera 2 - Baia B",
    events: [
      {
        id: 4,
        type: "nascimento",
        description: "3 leitões nascidos",
        timestamp: "Hoje, 12:45",
        count: 3
      }
    ]
  },
  {
    cameraId: 3,
    cameraName: "Câmera 3 - Baia C",
    events: [
      {
        id: 5,
        type: "esmagamento",
        description: "Alerta de esmagamento detectado - Intervenção necessária",
        timestamp: "Hoje, 15:10"
      },
      {
        id: 6,
        type: "nascimento",
        description: "Leitão nascido com sucesso",
        timestamp: "Hoje, 10:30",
        count: 1
      }
    ]
  },
  {
    cameraId: 4,
    cameraName: "Câmera 4 - Baia D",
    events: [
      {
        id: 7,
        type: "nascimento",
        description: "4 leitões nascidos",
        timestamp: "Ontem, 22:15",
        count: 4
      },
      {
        id: 8,
        type: "morte",
        description: "Leitão sem sinais vitais detectado",
        timestamp: "Ontem, 20:30"
      }
    ]
  },
  {
    cameraId: 5,
    cameraName: "Câmera 5 - Baia E",
    events: [
      {
        id: 9,
        type: "nascimento",
        description: "Leitão nascido com sucesso",
        timestamp: "Ontem, 18:45",
        count: 1
      }
    ]
  },
  {
    cameraId: 6,
    cameraName: "Câmera 6 - Baia F",
    events: [
      {
        id: 10,
        type: "nascimento",
        description: "5 leitões nascidos",
        timestamp: "Ontem, 16:20",
        count: 5
      },
      {
        id: 11,
        type: "nascimento",
        description: "2 leitões nascidos",
        timestamp: "Ontem, 14:00",
        count: 2
      }
    ]
  },
  {
    cameraId: 7,
    cameraName: "Câmera 7 - Baia G",
    events: [
      {
        id: 12,
        type: "esmagamento",
        description: "Risco de esmagamento identificado",
        timestamp: "Ontem, 23:30"
      },
      {
        id: 13,
        type: "nascimento",
        description: "Leitão nascido com sucesso",
        timestamp: "Ontem, 19:15",
        count: 1
      }
    ]
  }
];

export function CameraNotifications() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "nascimento":
        return <Baby className="w-4 h-4" />;
      case "morte":
        return <Skull className="w-4 h-4" />;
      case "esmagamento":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "nascimento":
        return "text-green-600 bg-green-50";
      case "morte":
        return "text-gray-700 bg-gray-100";
      case "esmagamento":
        return "text-red-600 bg-red-50";
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  const getEventBadgeVariant = (type: string): "default" | "destructive" | "secondary" => {
    switch (type) {
      case "nascimento":
        return "default";
      case "morte":
        return "secondary";
      case "esmagamento":
        return "destructive";
      default:
        return "default";
    }
  };

  const totalEvents = cameraNotifications.reduce((acc, cam) => acc + cam.events.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-1">Eventos por Câmera/Baia</h2>
          <p className="text-sm text-gray-600">Histórico detalhado de eventos em cada baia</p>
        </div>
        <Badge variant="secondary">{totalEvents} eventos</Badge>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {cameraNotifications.map((camera) => (
          <AccordionItem 
            key={camera.cameraId} 
            value={`camera-${camera.cameraId}`}
            className="border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-4 hover:bg-gray-50">
              <div className="flex items-center gap-3 flex-1">
                <Video className="w-5 h-5 text-gray-600" />
                <span>{camera.cameraName}</span>
                <Badge variant="outline" className="ml-auto mr-2">
                  {camera.events.length} eventos
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2 mt-2">
                {camera.events.map((event) => (
                  <Card key={event.id} className={`p-3 ${getEventColor(event.type)}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant={getEventBadgeVariant(event.type)} className="text-xs">
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          {event.count && (
                            <span className="text-xs px-2 py-0.5 bg-white rounded-full">
                              {event.count} {event.count === 1 ? 'leitão' : 'leitões'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm">{event.description}</p>
                        <div className="flex items-center gap-1 text-xs opacity-75 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
