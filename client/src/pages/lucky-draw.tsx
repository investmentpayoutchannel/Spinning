
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FortuneWheel } from '@/components/fortune-wheel';
import { useToast } from '@/hooks/use-toast';
import { Gift, Wallet, Info, TrendingUp, Star, Trophy } from 'lucide-react';
import type { Prize, SpinResult } from '@shared/schema';

export default function LuckyDraw() {
  const { toast } = useToast();
  const [hasWonToday, setHasWonToday] = useState(false);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);

  // Mock prizes for display
  const displayPrizes: Prize[] = [
    { id: '1', label: 'PHP 77,000', amount: 77000, weight: 50, isActive: true },
    { id: '2', label: 'PHP 176,000', amount: 176000, weight: 25, isActive: true },
    { id: '3', label: 'PHP 297,000', amount: 297000, weight: 12, isActive: true },
    { id: '4', label: 'PHP 387,000', amount: 387000, weight: 8, isActive: true },
    { id: '5', label: 'PHP 419,000', amount: 419000, weight: 4, isActive: true },
    { id: '6', label: 'Try Again', amount: 0, weight: 1, isActive: true },
  ];

  // Weighted random selection
  const selectPrizeByWeight = (prizes: Prize[]): Prize => {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const prize of prizes) {
      random -= prize.weight;
      if (random <= 0) return prize;
    }
    
    return prizes[prizes.length - 1];
  };

  // Reset state for fresh testing
  useState(() => {
    localStorage.removeItem('wheelWinResult');
    setHasWonToday(false);
    setTotalWinnings(0);
    setTotalSpins(0);
  });

  // Spin mutation
  const spinMutation = useMutation({
    mutationFn: async (): Promise<SpinResult> => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const selectedPrize = selectPrizeByWeight(displayPrizes);
      
      return {
        amount: selectedPrize.amount,
        label: selectedPrize.label,
        canSpinAgain: selectedPrize.amount === 0,
        prizeId: selectedPrize.id,
      };
    },
    onSuccess: (result) => {
      setTotalSpins(prev => prev + 1);
      
      if (result.amount > 0) {
        setHasWonToday(true);
        setTotalWinnings(prev => prev + result.amount);
        
        const winData = {
          amount: result.amount,
          label: result.label,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('wheelWinResult', JSON.stringify(winData));
        
        toast({
          title: "🎉 Congratulations!",
          description: "Bonus is on its way to your Trading Account!",
          duration: 8000,
        });
      } else {
        toast({
          title: "Try Again! 🎯",
          description: "Better luck next time! You can spin again.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Spin failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  const successRate = totalSpins > 0 ? Math.round(((totalSpins - (hasWonToday ? 0 : totalSpins)) / totalSpins) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Hero Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mb-4 shadow-xl">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent mb-3">
            First Timer Bonus Wheel
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Spin the wheel and claim your exclusive welcome bonus!
          </p>
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full shadow-lg">
            <Gift className="mr-2 h-4 w-4" />
            <span className="font-semibold text-sm sm:text-base">Welcome Bonus Active</span>
            <Star className="ml-2 h-4 w-4 animate-pulse" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Wheel Section */}
          <div className="lg:col-span-3">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl sm:text-2xl text-gray-800">Fortune Wheel</CardTitle>
                <p className="text-gray-600">Spin to claim your bonus!</p>
              </CardHeader>
              <CardContent className="pb-6">
                <FortuneWheel
                  prizes={displayPrizes}
                  onSpin={() => spinMutation.mutateAsync()}
                  disabled={hasWonToday}
                  isSpinning={spinMutation.isPending}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Winnings Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm sm:text-base">Your Winnings</h3>
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1" data-testid="user-balance">
                  {formatCurrency(totalWinnings)}
                </div>
                <p className="text-emerald-100 text-xs sm:text-sm">Total earnings today</p>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-blue-500" />
                  Today's Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={hasWonToday ? "default" : "secondary"} data-testid="spins-remaining">
                    {hasWonToday ? '🏆 Bonus Claimed!' : '🎯 Ready to Spin'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-semibold text-green-600" data-testid="success-rate">
                    {successRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Spins:</span>
                  <span className="font-semibold" data-testid="total-spins">
                    {totalSpins}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Prize List - Mobile optimized */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Prize Pool</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {displayPrizes.map((prize) => (
                  <div key={prize.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {prize.label}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        prize.weight >= 25 ? 'border-green-500 text-green-700 bg-green-50' :
                        prize.weight >= 10 ? 'border-blue-500 text-blue-700 bg-blue-50' :
                        prize.weight >= 5 ? 'border-orange-500 text-orange-700 bg-orange-50' :
                        prize.amount === 0 ? 'border-gray-500 text-gray-700 bg-gray-50' : 
                        'border-purple-500 text-purple-700 bg-purple-50'
                      }`}
                    >
                      {prize.weight >= 25 ? 'High' :
                       prize.weight >= 10 ? 'Medium' :
                       prize.weight >= 5 ? 'Low' :
                       prize.amount === 0 ? 'Retry' : 'Ultra Rare'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Terms Section - Mobile friendly */}
        <Card className="mt-6 lg:mt-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Info className="text-blue-500 mr-2 h-5 w-5" />
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Game Rules</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>One bonus prize per user</li>
                  <li>Unlimited spins until first win</li>
                  <li>"Try Again" allows continued play</li>
                  <li>All spins are recorded securely</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Prize Distribution</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>₱77,000: 50% probability</li>
                  <li>₱176,000: 25% probability</li>
                  <li>₱297,000: 12% probability</li>
                  <li>₱387,000: 8% probability</li>
                  <li>₱419,000: 4% probability</li>
                  <li>Try Again: 1% probability</li>
                </ul>
              </div>
            </div>
            <Alert className="mt-4 border-blue-200 bg-blue-50">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-xs sm:text-sm text-blue-800">
                <strong>Disclaimer:</strong> This is a demonstration wheel with simulated prizes. 
                All results are generated locally for testing purposes.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
