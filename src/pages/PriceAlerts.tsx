import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  BellOff, 
  Trash2, 
  Hotel, 
  Plane, 
  Car, 
  ArrowLeft,
  TrendingDown,
  Clock
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { usePriceAlerts, AlertSearchType } from '@/hooks/usePriceAlerts';
import { useAuth } from '@/hooks/useAuth';

const PriceAlerts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { alerts, loading, deleteAlert, toggleAlert } = usePriceAlerts();

  if (!user) {
    navigate('/');
    return null;
  }

  const getIcon = (type: AlertSearchType) => {
    switch (type) {
      case 'hotel':
        return <Hotel className="h-5 w-5" />;
      case 'flight':
        return <Plane className="h-5 w-5" />;
      case 'car':
        return <Car className="h-5 w-5" />;
    }
  };

  const getSearchLabel = (type: AlertSearchType, params: Record<string, unknown>) => {
    switch (type) {
      case 'hotel':
        return `${params.city} • ${params.checkIn} to ${params.checkOut}`;
      case 'flight':
        return `${params.origin} → ${params.destination} • ${params.departDate}`;
      case 'car':
        return `${params.pickupLocation} • ${params.pickupDate} to ${params.dropoffDate}`;
      default:
        return 'Search';
    }
  };

  const activeAlerts = alerts.filter(a => a.is_active);
  const inactiveAlerts = alerts.filter(a => !a.is_active);
  const triggeredAlerts = alerts.filter(a => a.triggered_at);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Price Alerts</h1>
              <p className="text-muted-foreground">
                Get notified when prices drop on your tracked items
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : alerts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No price alerts yet</h3>
                <p className="text-muted-foreground mb-6">
                  Search for hotels, flights, or cars and set price alerts to get notified when prices drop.
                </p>
                <Button onClick={() => navigate('/')}>
                  Start Searching
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Triggered Alerts */}
              {triggeredAlerts.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
                    <TrendingDown className="h-5 w-5" />
                    Price Drops ({triggeredAlerts.length})
                  </h2>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {triggeredAlerts.map((alert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                        >
                          <Card className="border-primary/50 bg-primary/5">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                  {getIcon(alert.search_type as AlertSearchType)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{alert.item_name}</p>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {getSearchLabel(alert.search_type as AlertSearchType, alert.search_params as Record<string, unknown>)}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-primary font-bold">
                                      Now ${alert.current_price}
                                    </span>
                                    <span className="text-sm text-muted-foreground line-through">
                                      Target: ${alert.target_price}
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteAlert(alert.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              )}

              {/* Active Alerts */}
              {activeAlerts.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Active Alerts ({activeAlerts.length})
                  </h2>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {activeAlerts.filter(a => !a.triggered_at).map((alert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                        >
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                  {getIcon(alert.search_type as AlertSearchType)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{alert.item_name}</p>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {getSearchLabel(alert.search_type as AlertSearchType, alert.search_params as Record<string, unknown>)}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-primary font-bold">
                                      Target: ${alert.target_price}
                                    </span>
                                    {alert.current_price && (
                                      <span className="text-sm text-muted-foreground">
                                        Current: ${alert.current_price}
                                      </span>
                                    )}
                                  </div>
                                  {alert.last_checked_at && (
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      Last checked {formatDistanceToNow(new Date(alert.last_checked_at), { addSuffix: true })}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={alert.is_active}
                                    onCheckedChange={(checked) => toggleAlert(alert.id, checked)}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteAlert(alert.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              )}

              {/* Inactive Alerts */}
              {inactiveAlerts.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-muted-foreground">
                    <BellOff className="h-5 w-5" />
                    Paused Alerts ({inactiveAlerts.length})
                  </h2>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {inactiveAlerts.map((alert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                        >
                          <Card className="opacity-60">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                                  {getIcon(alert.search_type as AlertSearchType)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{alert.item_name}</p>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {getSearchLabel(alert.search_type as AlertSearchType, alert.search_params as Record<string, unknown>)}
                                  </p>
                                  <p className="text-sm mt-1">
                                    Target: ${alert.target_price}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={alert.is_active}
                                    onCheckedChange={(checked) => toggleAlert(alert.id, checked)}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteAlert(alert.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PriceAlerts;
