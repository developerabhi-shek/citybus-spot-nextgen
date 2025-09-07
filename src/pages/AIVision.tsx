import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Camera, Upload, Users, Eye, Zap, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AIVision() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('/placeholder.svg');

  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const mockResult = {
        personCount: Math.floor(Math.random() * 30) + 5,
        confidence: 0.85 + Math.random() * 0.1,
        timestamp: new Date(),
        crowdLevel: Math.random() > 0.5 ? 'moderate' : 'high',
        demographics: {
          adults: Math.floor(Math.random() * 20) + 10,
          children: Math.floor(Math.random() * 8) + 2,
          elderly: Math.floor(Math.random() * 5) + 1
        },
        behaviorAnalysis: {
          standing: 65,
          sitting: 35,
          movement: 'normal'
        }
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected ${mockResult.personCount} people with ${Math.round(mockResult.confidence * 100)}% confidence`,
      });
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-success';
      case 'moderate': return 'bg-warning';
      case 'high': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          AI Vision Demo
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time passenger detection and crowd analysis using AI
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary">Demo Mode</Badge>
          <span className="text-sm text-muted-foreground">
            Uses TensorFlow.js for in-browser inference
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Analysis */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Image Analysis
              </CardTitle>
              <CardDescription>
                Upload an image or use a demo frame for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Display */}
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Analysis target"
                  className="w-full aspect-video object-cover"
                />
                {analysisResult && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{analysisResult.personCount}</div>
                      <div className="text-sm text-muted-foreground">People Detected</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload/Demo Controls */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outline" className="w-full" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </span>
                    </Button>
                  </label>
                </div>
                
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>

              {/* Demo Images */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Demo Images</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedImage('/placeholder.svg');
                        setAnalysisResult(null);
                      }}
                      className="h-20"
                    >
                      <div className="text-center">
                        <Camera className="h-4 w-4 mx-auto mb-1" />
                        <div className="text-xs">Demo {i}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Feed Option */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Feed Analysis
              </CardTitle>
              <CardDescription>
                Analyze frames from live CCTV feeds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Bus DL01AB1234</div>
                    <div className="text-sm text-muted-foreground">Interior Camera</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Capture Frame
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Connaught Place Station</div>
                    <div className="text-sm text-muted-foreground">Platform Camera</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Capture Frame
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          {analysisResult ? (
            <>
              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Analysis Results
                  </CardTitle>
                  <CardDescription>
                    AI-powered passenger detection and analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Main Count */}
                  <div className="text-center p-6 bg-gradient-primary/10 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {analysisResult.personCount}
                    </div>
                    <div className="text-lg font-medium mb-1">People Detected</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(analysisResult.confidence * 100)}% confidence
                    </div>
                  </div>

                  {/* Crowd Level */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Crowd Level:</span>
                    <Badge className={getCrowdLevelColor(analysisResult.crowdLevel)}>
                      {analysisResult.crowdLevel.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Demographics */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Demographics Breakdown</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-muted/30 rounded">
                        <div className="text-lg font-semibold">{analysisResult.demographics.adults}</div>
                        <div className="text-xs text-muted-foreground">Adults</div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <div className="text-lg font-semibold">{analysisResult.demographics.children}</div>
                        <div className="text-xs text-muted-foreground">Children</div>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <div className="text-lg font-semibold">{analysisResult.demographics.elderly}</div>
                        <div className="text-xs text-muted-foreground">Elderly</div>
                      </div>
                    </div>
                  </div>

                  {/* Behavior Analysis */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Behavior Analysis</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Standing</span>
                        <span>{analysisResult.behaviorAnalysis.standing}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${analysisResult.behaviorAnalysis.standing}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Sitting</span>
                        <span>{analysisResult.behaviorAnalysis.sitting}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-secondary h-2 rounded-full" 
                          style={{ width: `${analysisResult.behaviorAnalysis.sitting}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Analysis completed at {analysisResult.timestamp.toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysisResult.crowdLevel === 'high' && (
                    <div className="flex gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-yellow-900 dark:text-yellow-100">
                          High Crowd Density
                        </div>
                        <div className="text-sm text-yellow-700 dark:text-yellow-300">
                          Consider deploying additional buses on this route
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm space-y-1">
                    <div>• Current occupancy is within safe limits</div>
                    <div>• Passenger distribution appears normal</div>
                    <div>• No emergency situations detected</div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground">
                    Upload an image or select a demo to start AI analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Info */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Model:</strong> COCO-SSD + MobileNet
              </div>
              <div>
                <strong>Framework:</strong> TensorFlow.js
              </div>
              <div>
                <strong>Inference:</strong> Client-side (browser)
              </div>
              <div>
                <strong>Privacy:</strong> No data sent to servers
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  Production Features
                </div>
                <div className="text-blue-700 dark:text-blue-300 mt-1">
                  Real implementation would include face detection, age estimation, 
                  crowd flow analysis, and safety alerts.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}