import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { Prize } from '@shared/schema';

interface FortuneWheelProps {
  prizes: Prize[];
  onSpin: () => Promise<any>;
  disabled?: boolean;
  isSpinning?: boolean;
}

export function FortuneWheel({ prizes, onSpin, disabled = false }: FortuneWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);

  const segmentAngle = 360 / prizes.length;

  // Initialize audio elements
  useEffect(() => {
    // Create spinning sound (using Web Audio API to generate a roulette-like sound)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createSpinSound = () => {
      const audio = new Audio();
      // Create a data URL for a simple spinning sound using Web Audio API
      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 3, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < buffer.length; i++) {
        // Create a roulette-like spinning sound with decreasing frequency
        const progress = i / buffer.length;
        const frequency = 200 + (1 - progress) * 300; // Decreasing frequency
        const volume = 0.1 * (1 - progress * 0.5); // Decreasing volume
        data[i] = Math.sin(2 * Math.PI * frequency * i / audioContext.sampleRate) * volume;
      }
      
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.9);
      
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      return { source, gainNode };
    };

    // Create win sound
    const createWinSound = () => {
      const audio = new Audio();
      // Simple victory sound
      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < buffer.length; i++) {
        const progress = i / buffer.length;
        const frequency = 440 + progress * 220; // Rising frequency
        const volume = 0.2 * Math.sin(progress * Math.PI); // Bell curve volume
        data[i] = Math.sin(2 * Math.PI * frequency * i / audioContext.sampleRate) * volume;
      }
      
      return buffer;
    };

    return () => {
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []);
  
  // Bright, distinct colors for each segment
  const colors = [
    '#FF3366', // Bright Red
    '#33FF66', // Bright Green
    '#3366FF', // Bright Blue
    '#FF6633', // Orange
    '#9933FF', // Purple
    '#33FFFF', // Cyan
    '#FFFF33', // Yellow
    '#FF33FF', // Magenta
  ];

  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  const createSegmentPath = (index: number) => {
    const centerX = 150;
    const centerY = 150;
    const radius = 140;
    
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const largeArc = segmentAngle > 180 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const centerX = 150;
    const centerY = 150;
    const textRadius = 90;
    
    const angle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
    const x = centerX + textRadius * Math.cos(angle);
    const y = centerY + textRadius * Math.sin(angle);
    
    return { x, y, angle: angle * (180 / Math.PI) + 90 };
  };

  const playSpinSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create spinning sound effect
      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 3, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < buffer.length; i++) {
        const progress = i / buffer.length;
        const frequency = 150 + (1 - progress) * 250;
        const volume = 0.15 * (1 - progress * 0.3);
        data[i] = Math.sin(2 * Math.PI * frequency * i / audioContext.sampleRate) * volume;
      }
      
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  };

  const playWinSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create win sound effect
      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.8, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < buffer.length; i++) {
        const progress = i / buffer.length;
        const frequency = 523 + progress * 200; // C5 note rising
        const volume = 0.3 * Math.sin(progress * Math.PI);
        data[i] = Math.sin(2 * Math.PI * frequency * i / audioContext.sampleRate) * volume;
      }
      
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  };

  const handleSpin = useCallback(async () => {
    if (disabled || isSpinning || showResult) return;

    setIsSpinning(true);
    setShowResult(false);
    setWonPrize(null);

    // Play spinning sound
    playSpinSound();

    try {
      const result = await onSpin();
      
      // Find the prize in our array that matches the result
      const selectedPrize = prizes.find(prize => prize.id === result.prizeId);
      
      if (selectedPrize) {
        // Find the index of this prize in our array
        const prizeIndex = prizes.indexOf(selectedPrize);
        
        // Calculate where this segment should be positioned under the pointer
        // The pointer is at the top (12 o'clock) pointing down, which is -90 degrees
        // Each segment center is at: index * segmentAngle + segmentAngle/2 - 90 degrees
        const pointerAngle = -90; // 12 o'clock position
        const segmentCenterAngle = prizeIndex * segmentAngle + segmentAngle / 2 - 90;
        
        // To align the winning segment center with the pointer, we need to rotate
        // so that the segment center ends up at the pointer angle (-90 degrees)
        const targetRotation = pointerAngle - segmentCenterAngle;
        
        // Add several full rotations for the spinning effect (must be integer)
        const fullSpins = 6 + Math.floor(Math.random() * 5); // 6-10 full spins
        const totalRotation = targetRotation + (fullSpins * 360);
        
        setRotation(totalRotation);
        setWonPrize(selectedPrize);

        // After spinning animation completes, show result if won something
        setTimeout(() => {
          setIsSpinning(false);
          if (selectedPrize.amount > 0) {
            setShowResult(true);
            // Play win sound
            playWinSound();
          }
        }, 3000);
      } else {
        console.error('Selected prize not found in prizes array');
        setIsSpinning(false);
      }

    } catch (error) {
      console.error('Spin failed:', error);
      setIsSpinning(false);
    }
  }, [disabled, isSpinning, showResult, onSpin, prizes, segmentAngle]);

  const resetWheel = () => {
    setShowResult(false);
    setWonPrize(null);
    setRotation(0);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-4 py-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer - pointing down at the wheel */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <svg width="24" height="36" viewBox="0 0 24 36">
            <polygon 
              points="12,36 0,0 24,0" 
              fill="#FFD700" 
              stroke="#FFA500" 
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Wheel */}
        <div className="relative bg-white rounded-full p-4 shadow-2xl">
          <svg 
            ref={wheelRef}
            width="300" 
            height="300" 
            viewBox="0 0 300 300"
            className="drop-shadow-lg"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning 
                ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' 
                : 'transform 0.5s ease-out'
            }}
          >
            {/* Wheel segments */}
            {prizes.map((prize, index) => {
              const path = createSegmentPath(index);
              const color = colors[index % colors.length];
              const textPos = getTextPosition(index);
              
              return (
                <g key={prize.id} data-testid={`wheel-segment-${index}`}>
                  {/* Segment */}
                  <path
                    d={path}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  
                  {/* Prize text */}
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                    }}
                  >
                    {prize.amount === 0 ? 'TRY AGAIN' : formatCurrency(prize.amount)}
                  </text>
                </g>
              );
            })}
            
            {/* Center circle */}
            <circle
              cx="150"
              cy="150"
              r="25"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="3"
            />
            <circle
              cx="150"
              cy="150"
              r="15"
              fill="#ffffff"
            />
            <circle
              cx="150"
              cy="150"
              r="8"
              fill="#FFD700"
            />
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={handleSpin}
        disabled={disabled || isSpinning || showResult}
        size="lg"
        className={`px-12 py-6 text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          isSpinning ? 'animate-pulse' : ''
        }`}
        data-testid="button-spin"
      >
        {isSpinning ? (
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>SPINNING...</span>
          </div>
        ) : showResult ? (
          <div className="flex items-center space-x-3">
            <span>🏆</span>
            <span>BONUS CLAIMED!</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <span>🎯</span>
            <span>SPIN TO WIN</span>
          </div>
        )}
      </Button>

      {/* Result Modal */}
      {showResult && wonPrize && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" data-testid="modal-result">
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4" data-testid="text-congratulations">
              CONGRATULATIONS!
            </h3>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl mb-6 shadow-lg">
              <p className="text-2xl font-bold mb-2" data-testid="text-amount-won">
                You Won {formatCurrency(wonPrize.amount)}!
              </p>
              <p className="text-sm opacity-90">
                🎊 Bonus credited to your account!
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mb-4">
              <p className="font-semibold mb-2">✅ Processing Complete!</p>
              <p>Your Trading Account has been credited.</p>
              <p>Management will contact you shortly.</p>
            </div>
            <Button
              onClick={resetWheel}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg"
              data-testid="button-continue"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}