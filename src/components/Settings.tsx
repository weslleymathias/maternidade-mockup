import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Settings as SettingsIcon, Video, Bell, Thermometer, Save } from "lucide-react";
import { useState } from "react";

export function Settings() {
  const [motionDetection, setMotionDetection] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [autoRecording, setAutoRecording] = useState(true);
  const [nightVision, setNightVision] = useState(true);
  const [sensitivity, setSensitivity] = useState([75]);
  const [tempAlerts, setTempAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-5 h-5" />
        <div>
          <h2>Configurações Gerais</h2>
          <p className="text-sm text-gray-600">Gerencie as configurações do sistema de monitoramento</p>
        </div>
      </div>

      {/* Camera Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Video className="w-5 h-5 text-blue-600" />
          <h3>Configurações de Câmera</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Visão Noturna</Label>
              <p className="text-sm text-gray-600">Ativa automaticamente em ambientes escuros</p>
            </div>
            <Switch checked={nightVision} onCheckedChange={setNightVision} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Gravação Automática</Label>
              <p className="text-sm text-gray-600">Grava automaticamente quando detectar movimento</p>
            </div>
            <Switch checked={autoRecording} onCheckedChange={setAutoRecording} />
          </div>

          <div className="space-y-2">
            <Label>Resolução de Vídeo</Label>
            <Select defaultValue="1080p">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="720p">720p (HD)</SelectItem>
                <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                <SelectItem value="4k">4K (Ultra HD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Taxa de Quadros (FPS)</Label>
            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 FPS</SelectItem>
                <SelectItem value="30">30 FPS</SelectItem>
                <SelectItem value="60">60 FPS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Detection Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-orange-600" />
          <h3>Detecção e Alertas</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Detecção de Movimento</Label>
              <p className="text-sm text-gray-600">Identifica atividades incomuns nas baias</p>
            </div>
            <Switch checked={motionDetection} onCheckedChange={setMotionDetection} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Sensibilidade de Detecção</Label>
              <span className="text-sm text-gray-600">{sensitivity[0]}%</span>
            </div>
            <Slider 
              value={sensitivity} 
              onValueChange={setSensitivity}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Ajuste a sensibilidade para evitar falsos positivos
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertas Sonoros</Label>
              <p className="text-sm text-gray-600">Emite som quando detectar eventos importantes</p>
            </div>
            <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
          </div>

          <div className="space-y-2">
            <Label>Tipos de Eventos para Alertar</Label>
            <div className="space-y-2 pl-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="birth" defaultChecked className="rounded" />
                <label htmlFor="birth" className="text-sm">Nascimento</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="death" defaultChecked className="rounded" />
                <label htmlFor="death" className="text-sm">Morte</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="crushing" defaultChecked className="rounded" />
                <label htmlFor="crushing" className="text-sm">Esmagamento</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="movement" defaultChecked className="rounded" />
                <label htmlFor="movement" className="text-sm">Movimento Intenso</label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Temperature Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer className="w-5 h-5 text-red-600" />
          <h3>Monitoramento de Temperatura</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertas de Temperatura</Label>
              <p className="text-sm text-gray-600">Notifica quando temperatura estiver fora do ideal</p>
            </div>
            <Switch checked={tempAlerts} onCheckedChange={setTempAlerts} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Temperatura Mínima (°C)</Label>
              <Input type="number" defaultValue="18" />
            </div>
            <div className="space-y-2">
              <Label>Temperatura Máxima (°C)</Label>
              <Input type="number" defaultValue="24" />
            </div>
          </div>
        </div>
      </Card>

      {/* Storage Settings */}
      <Card className="p-6">
        <div className="mb-4">
          <h3>Armazenamento</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Retenção de Gravações</Label>
            <Select defaultValue="7">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 dias</SelectItem>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="15">15 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              💾 Espaço usado: 45.2 GB de 100 GB (45%)
            </p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Restaurar Padrão</Button>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
