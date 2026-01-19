import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Upload, Film, Loader2, Key, Monitor, Smartphone, AlertCircle } from 'lucide-react';
import Button from './Button';

interface VeoAnimatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const VeoAnimator: React.FC<VeoAnimatorProps> = ({ isOpen, onClose }) => {
  const [hasKey, setHasKey] = useState(false);
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      checkKey();
    }
  }, [isOpen]);

  const checkKey = async () => {
    try {
      // @ts-ignore
      const has = await window.aistudio.hasSelectedApiKey();
      setHasKey(has);
    } catch (e) {
      console.error("Error checking API key", e);
    }
  };

  const requestKey = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      await checkKey();
    } catch (e) {
      console.error("Error requesting API key", e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large. Please use an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Extract pure base64 data
      const base64Data = base64String.split(',')[1];
      setImage({
        data: base64Data,
        mimeType: file.type
      });
      setPreviewUrl(base64String);
      setError(null);
      setGeneratedVideoUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const generateVideo = async () => {
    if (!image || !hasKey) return;

    setIsGenerating(true);
    setError(null);
    setStatus('INITIALIZING NEURAL LINK...');

    try {
      // Initialize AI with the key from process.env (injected by the environment after selection)
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setStatus('UPLOADING ASSET TO VEO-3.1...');
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        image: {
          imageBytes: image.data,
          mimeType: image.mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio,
        }
      });

      setStatus('RENDERING VIDEO STREAM...');
      
      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        setStatus('PROCESSING FRAMES...');
      }

      if (operation.error) {
        throw new Error(operation.error.message || 'Generation failed');
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) throw new Error('No video URI returned');

      setStatus('DOWNLOADING SECURE STREAM...');
      
      // Fetch the actual video bytes using the API key
      const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error('Failed to download video');
      
      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);
      
      setGeneratedVideoUrl(videoUrl);
      setStatus('COMPLETE');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unknown error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-brand-dark border border-brand-accent box-shadow-[0_0_30px_rgba(0,243,255,0.2)] flex flex-col max-h-[90vh] overflow-hidden clip-corner-large">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-accent/20 bg-brand-secondary/30">
          <div className="flex items-center gap-2">
            <Film className="text-brand-accent animate-pulse" />
            <h2 className="text-2xl font-display font-bold text-white tracking-widest">VEO ANIMATOR <span className="text-xs align-top text-brand-accent opacity-70">v3.1</span></h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* API Key Section */}
          {!hasKey ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 border border-dashed border-brand-accent/30 rounded bg-brand-accent/5">
              <Key className="w-12 h-12 text-brand-accent opacity-50" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">AUTHENTICATION REQUIRED</h3>
                <p className="text-gray-400 text-sm max-w-md">To access the Veo Generation Matrix, a valid secure key is required.</p>
              </div>
              <Button onClick={requestKey} variant="primary" className="mt-4">
                AUTHENTICATE KEY
              </Button>
              <div className="text-xs text-gray-500 mt-2">
                Paid Google Cloud Project required for Veo models.
                <br />
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-brand-accent">View Billing Docs</a>
              </div>
            </div>
          ) : (
            <>
              {/* Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Input Column */}
                <div className="space-y-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative h-64 border-2 border-dashed ${image ? 'border-brand-accent' : 'border-gray-600'} rounded flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors overflow-hidden group`}
                  >
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-400 font-mono">UPLOAD SOURCE IMAGE</span>
                      </div>
                    )}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Aspect Ratio Selector */}
                  <div className="flex gap-2 bg-black/40 p-1 rounded border border-white/10">
                    <button 
                      onClick={() => setAspectRatio('16:9')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono transition-colors ${aspectRatio === '16:9' ? 'bg-brand-accent text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Monitor size={14} /> 16:9 LANDSCAPE
                    </button>
                    <button 
                      onClick={() => setAspectRatio('9:16')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono transition-colors ${aspectRatio === '9:16' ? 'bg-brand-accent text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Smartphone size={14} /> 9:16 PORTRAIT
                    </button>
                  </div>
                </div>

                {/* Output Column */}
                <div className="relative h-64 md:h-auto bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                  {isGenerating ? (
                    <div className="text-center space-y-4 z-10">
                      <Loader2 className="w-10 h-10 text-brand-accent animate-spin mx-auto" />
                      <div className="font-mono text-xs text-brand-accent animate-pulse">{status}</div>
                    </div>
                  ) : generatedVideoUrl ? (
                    <video controls autoPlay loop className="w-full h-full object-contain">
                      <source src={generatedVideoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="text-gray-600 font-mono text-xs text-center px-4">
                      AWAITING GENERATION...
                    </div>
                  )}
                  
                  {/* Grid overlay for aesthetic */}
                  <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px] opacity-5 pointer-events-none" />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-brand-danger text-sm bg-brand-danger/10 p-3 border border-brand-danger/30">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <Button 
                  onClick={generateVideo} 
                  variant="primary" 
                  fullWidth 
                  disabled={!image || isGenerating}
                  className={!image || isGenerating ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {isGenerating ? 'PROCESSING...' : 'INITIATE GENERATION'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VeoAnimator;
