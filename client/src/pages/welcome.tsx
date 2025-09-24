
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Gift } from 'lucide-react';

export default function Welcome() {
  const [, setLocation] = useLocation();

  const handleClaimBonus = () => {
    setLocation('/lucky-draw');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Coins className="text-secondary text-6xl mb-4 mx-auto" />
          <h2 className="text-3xl font-bold text-white mb-2">BDO Binary Company</h2>
          <p className="text-white/80">First Timer Bonus - Lucky Draw</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Welcome Investor!</CardTitle>
            <p className="text-muted-foreground mt-2">
              To Your Bonus as a first timer!
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="inline-flex items-center bg-accent text-accent-foreground px-6 py-3 rounded-full">
              <Gift className="mr-2 h-5 w-5" />
              <span className="font-medium">First Timer Bonus Available</span>
            </div>
            
            <p className="text-muted-foreground">
              Congratulations! You're eligible for our exclusive first-timer bonus. 
              Click below to claim your bonus and spin the fortune wheel!
            </p>
            
            <Button
              onClick={handleClaimBonus}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
              size="lg"
            >
              <Gift className="mr-2 h-5 w-5" />
              Click To Claim Bonus
            </Button>
            
            <div className="text-xs text-muted-foreground">
              <p>No registration required • Instant access</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/60 text-xs">
          <p>Secure and verified bonus system</p>
        </div>
      </div>
    </div>
  );
}
