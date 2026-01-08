import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const CustomerSupportInfo = () => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="QuestionMarkCircleIcon" size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Besoin d'aide ?
          </h3>
          <p className="text-sm text-muted-foreground mb-4 caption">
            Notre équipe de service client est disponible pour répondre à toutes vos questions concernant vos commandes.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Icon name="PhoneIcon" size={18} className="text-primary" />
              <span className="text-foreground font-medium">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="EnvelopeIcon" size={18} className="text-primary" />
              <span className="text-foreground font-medium">support@bodyfuel.fr</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="ClockIcon" size={18} className="text-primary" />
              <span className="text-muted-foreground caption">Lun-Ven: 9h00 - 18h00</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/user-account-dashboard"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Politique de retour et d'échange →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportInfo;