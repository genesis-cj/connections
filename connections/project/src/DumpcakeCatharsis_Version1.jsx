import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Laugh, Trash2, Cookie } from "lucide-react";

export default function DumpcakeCatharsis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-4 text-rose-600 drop-shadow">
        Dumpcake™ – Share the Cringe. Bake the Healing.
      </h1>

      <p className="text-center text-lg max-w-xl text-gray-700 mb-6">
        A raw, unfiltered feed of memories, regrets, screenshots, exes, tiger marks,
        and truths you've buried under 300 layers of curated perfection.
      </p>

      <Card className="w-full max-w-lg shadow-xl bg-white">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <div className="w-full h-48 border-2 border-dashed border-rose-400 rounded-xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-rose-400" />
            <span className="ml-2 text-rose-500 font-medium">Upload Your Shame</span>
          </div>

          <Button className="bg-rose-500 hover:bg-rose-600 text-white w-full text-lg">
            Post to Dumpcake
          </Button>

          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex items-center gap-1">
              <Laugh className="w-4 h-4" /> LOL
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Cookie className="w-4 h-4" /> Send Cookie
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Ghostflush™
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-500 mt-4 text-center max-w-xs">
        🔥 Auto-deletes in 30 days. Or keep it for legacy. Either way, it’s your cringe,
        your catharsis, your crown.
      </p>
    </div>
  );
}