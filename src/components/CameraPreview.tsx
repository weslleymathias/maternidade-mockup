import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Video, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CameraPreviewProps {
  id: number;
  name: string;
  status: "ativa" | "alerta" | "inativa";
  lastActivity?: string;
  imageUrl: string;
  onClick: () => void;
}

export function CameraPreview({ 
  id, 
  name, 
  status, 
  lastActivity, 
  imageUrl,
  onClick 
}: CameraPreviewProps) {
  const statusConfig = {
    ativa: { color: "bg-green-500", text: "Ativa" },
    alerta: { color: "bg-yellow-500", text: "Alerta" },
    inativa: { color: "bg-gray-400", text: "Inativa" }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-gray-900">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusConfig[status].color} animate-pulse`}></div>
          <Badge variant="secondary" className="text-xs">
            {statusConfig[status].text}
          </Badge>
        </div>
        {status === "alerta" && (
          <div className="absolute top-2 right-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="text-sm">{name}</span>
            </div>
          </div>
          {lastActivity && (
            <p className="text-xs text-gray-300 mt-1">{lastActivity}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
