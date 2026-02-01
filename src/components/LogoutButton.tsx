import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className="gap-2 text-muted-foreground hover:text-foreground"
    >
      <LogOut className="w-4 h-4" />
      Esci
    </Button>
  );
};

export default LogoutButton;
