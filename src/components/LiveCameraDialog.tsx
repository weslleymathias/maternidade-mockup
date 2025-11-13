import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Video, Maximize2, Volume2, VolumeX } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface LiveCameraDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cameraName: string;
  cameraId: number;
  imageUrl: string;
  status: "ativa" | "alerta" | "inativa";
}

export function LiveCameraDialog({ 
  open, 
  onOpenChange, 
  cameraName, 
  cameraId,
  imageUrl,
  status 
}: LiveCameraDialogProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            {cameraName} - Transmissão ao Vivo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={imageUrl}
              alt={cameraName}
              className="w-full h-full object-cover"
            />
            
            {/* Live indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm">AO VIVO</span>
            </div>

            {/* Status badge */}
            <div className="absolute top-3 right-3">
              <Badge variant={status === "alerta" ? "destructive" : "secondary"}>
                {status === "ativa" ? "Normal" : status === "alerta" ? "Atenção" : "Inativa"}
              </Badge>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Câmera</p>
              <p className="text-lg">#{cameraId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolução</p>
              <p className="text-lg">1080p</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">FPS</p>
              <p className="text-lg">30</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
