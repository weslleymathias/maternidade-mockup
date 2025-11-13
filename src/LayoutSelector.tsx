import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Layout, Sidebar, LayoutDashboard, Pencil } from "lucide-react";
import AppLayout1 from "./AppLayout1";
import AppLayout2 from "./AppLayout2";
import AppLayout3 from "./AppLayout3";
import AppLayout4 from "./AppLayout4";

type LayoutType = "layout1" | "layout2" | "layout3" | "layout4" | null;

export default function LayoutSelector() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>(null);

  if (selectedLayout === "layout1") return <AppLayout1 onBack={() => setSelectedLayout(null)} />;
  if (selectedLayout === "layout2") return <AppLayout2 onBack={() => setSelectedLayout(null)} />;
  if (selectedLayout === "layout3") return <AppLayout3 onBack={() => setSelectedLayout(null)} />;
  if (selectedLayout === "layout4") return <AppLayout4 onBack={() => setSelectedLayout(null)} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Sistema Maternidade</h1>
          <p className="text-gray-600">Escolha o layout que você prefere visualizar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layout 1 - Tabs */}
          <Card className="hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedLayout("layout1")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Layout className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Layout 1</CardTitle>
              </div>
              <CardDescription>Layout com navegação por abas superior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 mb-4 h-40 flex flex-col gap-2">
                <div className="bg-white rounded h-8 flex gap-1 p-1">
                  <div className="bg-blue-200 rounded flex-1"></div>
                  <div className="bg-gray-200 rounded flex-1"></div>
                  <div className="bg-gray-200 rounded flex-1"></div>
                </div>
                <div className="bg-white rounded flex-1"></div>
              </div>
              <Button className="w-full">Selecionar Layout</Button>
            </CardContent>
          </Card>

          {/* Layout 2 - Sidebar */}
          <Card className="hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedLayout("layout2")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Sidebar className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Layout 2</CardTitle>
              </div>
              <CardDescription>Layout com barra lateral de navegação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 mb-4 h-40 flex gap-2">
                <div className="bg-blue-200 rounded w-16 flex flex-col gap-1 p-1">
                  <div className="bg-white rounded h-6"></div>
                  <div className="bg-white rounded h-6"></div>
                  <div className="bg-white rounded h-6"></div>
                </div>
                <div className="bg-white rounded flex-1"></div>
              </div>
              <Button className="w-full" variant="secondary">Selecionar Layout</Button>
            </CardContent>
          </Card>

          {/* Layout 3 - Dashboard */}
          <Card className="hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedLayout("layout3")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <LayoutDashboard className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Layout 3</CardTitle>
              </div>
              <CardDescription>Layout estilo dashboard com cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 mb-4 h-40 flex flex-col gap-2">
                <div className="flex gap-2 h-12">
                  <div className="bg-green-200 rounded flex-1"></div>
                  <div className="bg-yellow-200 rounded flex-1"></div>
                  <div className="bg-red-200 rounded flex-1"></div>
                </div>
                <div className="bg-white rounded flex-1"></div>
              </div>
              <Button className="w-full" variant="outline">Selecionar Layout</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="text-center mb-4 text-gray-700">Versão Wireframe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Layout 4 - Low Fidelity */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer md:col-start-2" onClick={() => setSelectedLayout("layout4")}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gray-300 p-3 rounded-lg border-2 border-gray-500">
                    <Pencil className="w-6 h-6 text-gray-700" />
                  </div>
                  <CardTitle>Layout 4</CardTitle>
                </div>
                <CardDescription>Wireframe de baixa fidelidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-4 mb-4 h-40 flex flex-col gap-2 border-2 border-gray-400">
                  <div className="bg-white rounded h-8 flex gap-1 p-1 border-2 border-gray-400">
                    <div className="bg-gray-400 rounded flex-1"></div>
                    <div className="bg-gray-300 rounded flex-1"></div>
                    <div className="bg-gray-300 rounded flex-1"></div>
                  </div>
                  <div className="bg-white rounded flex-1 border-2 border-gray-400"></div>
                </div>
                <Button className="w-full bg-gray-700">Selecionar Layout</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Todas as versões possuem as mesmas funcionalidades, apenas com layouts visuais diferentes
          </p>
        </div>
      </div>
    </div>
  );
}