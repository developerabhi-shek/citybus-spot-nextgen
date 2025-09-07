import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Play, Pause, Volume2, VolumeX, Maximize, ExternalLink, Eye } from 'lucide-react';
import { mockCCTV } from '@/data/mockData';

export default function CCTVDemo() {
  const [selectedFeed, setSelectedFeed] = useState(mockCCTV[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'offline': return 'bg-destructive';
      case 'maintenance': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          CCTV Demo Feed
        </h1>
        <p className="text-muted-foreground mt-2">
          Live CCTV feeds from buses and stations (Demo)
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary">Demo Mode</Badge>
          <span className="text-sm text-muted-foreground">
            Real CCTV feeds require admin access
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    {selectedFeed.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedFeed.busId ? `Bus Camera: ${selectedFeed.busId}` : 'Station Camera'}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(selectedFeed.status)}>
                  {selectedFeed.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {selectedFeed.status === 'online' ? (
                <div className="relative bg-black">
                  {/* Video Player */}
                  <video
                    ref={videoRef}
                    className="w-full aspect-video"
                    poster="/placeholder.svg"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={selectedFeed.streamUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handlePlayPause}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleMuteToggle}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(selectedFeed.streamUrl, '_blank')}
                          className="text-white hover:bg-white/20"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          External
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      LIVE
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Feed Unavailable</h3>
                    <p className="text-muted-foreground">
                      {selectedFeed.status === 'offline' ? 'Camera is offline' : 'Under maintenance'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stream Info */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Stream Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Location:</span>
                  <div className="text-muted-foreground">
                    {selectedFeed.lat.toFixed(4)}, {selectedFeed.lng.toFixed(4)}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <div className="text-muted-foreground capitalize">
                    {selectedFeed.status}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Type:</span>
                  <div className="text-muted-foreground">
                    {selectedFeed.busId ? 'Mobile Camera' : 'Fixed Camera'}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Resolution:</span>
                  <div className="text-muted-foreground">1080p HD</div>
                </div>
              </div>
              
              {selectedFeed.busId && (
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Bus Integration
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    This camera is mounted inside bus {selectedFeed.busId} and moves with the vehicle
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feed List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Feeds</CardTitle>
              <CardDescription>
                Select a camera feed to view
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCCTV.map((feed) => (
                <div
                  key={feed.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedFeed.id === feed.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFeed(feed)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{feed.name}</h4>
                    <Badge className={getStatusColor(feed.status)} variant="secondary">
                      {feed.status}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {feed.busId ? `Bus: ${feed.busId}` : 'Station Camera'}
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>{Math.floor(Math.random() * 50) + 10} viewers</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About CCTV System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Demo Notice:</strong> These are sample video streams for demonstration purposes.
              </div>
              
              <div>
                <strong>Real Implementation:</strong> In production, this would show live feeds from:
              </div>
              
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Bus interior cameras</li>
                <li>• Station security cameras</li>
                <li>• Traffic monitoring cameras</li>
                <li>• Emergency response cameras</li>
              </ul>
              
              <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                <div className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Privacy Notice
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  All camera feeds are encrypted and access is strictly controlled for security and privacy.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}