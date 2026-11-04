import {
  CustomerOrderDTO,
  ProviderOrderDTO,
  InternalOrder,
  Property,
  CustomerContact,
  TierId,
  OrderStatus,
  OrderMessage,
  Tier,
  Offer,
  SystemAlert,
} from './types';
import {
  INITIAL_ORDERS,
  MOCK_PROVIDERS,
  INITIAL_ALERTS,
  INITIAL_AUDIT_LOG,
  TIERS,
  SAMPLE_ADDRESSES,
  MOCK_REPORT_SAMPLE,
  sanitizeForCustomer,
  sanitizeForProvider,
} from './data';
import { computeDueTime, computeInternalDueTime } from './clock';

class MockMarketplaceService {
  private orders: InternalOrder[] = [...INITIAL_ORDERS];
  private alerts: SystemAlert[] = [...INITIAL_ALERTS];
  private auditLog = [...INITIAL_AUDIT_LOG];
  private providers = [...MOCK_PROVIDERS];

  // Helper delay
  private delay(ms: number = 400): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Check coverage for an address
   */
  async checkCoverage(inputAddress: string): Promise<{ inCoverage: boolean; details: typeof SAMPLE_ADDRESSES[0] | null }> {
    await this.delay(350);
    const match = SAMPLE_ADDRESSES.find((s) =>
      inputAddress.toLowerCase().includes(s.city.toLowerCase()) ||
      inputAddress.toLowerCase().includes(s.address.toLowerCase()) ||
      inputAddress.toLowerCase().includes(s.county.toLowerCase())
    );

    if (match) {
      return { inCoverage: match.inCoverage, details: match };
    }

    // Default MD/VA/DC assumed covered unless Richmond
    const isRichmond = inputAddress.toLowerCase().includes('richmond');
    return {
      inCoverage: !isRichmond,
      details: null,
    };
  }

  /**
   * Return available speed tiers based on demo toggles and current time
   */
  async getAvailableTiers(
    county: string,
    now: Date = new Date(),
    allow12h: boolean = true,
    allow6h: boolean = true,
    isAfterHours: boolean = false
  ): Promise<{ tiers: (Tier & { dueFormatted: string; startsNotice?: string })[] }> {
    await this.delay(300);

    const result = TIERS.map((tier) => {
      const due = computeDueTime(tier.id, now, isAfterHours);
      return {
        ...tier,
        dueFormatted: due.formatted,
        startsNotice: due.searchStartsText,
      };
    }).filter((tier) => {
      if (tier.id === '6h' && !allow6h) return false;
      if (tier.id === '12h' && !allow12h) return false;
      return true;
    });

    return { tiers: result };
  }

  /**
   * Customer creates order - returns customer-safe DTO
   */
  async createOrder(
    property: Property,
    customer: CustomerContact,
    tierId: TierId,
    isAfterHours: boolean = false
  ): Promise<CustomerOrderDTO> {
    await this.delay(600);

    const tier = TIERS.find((t) => t.id === tierId) || TIERS[0];
    const now = new Date();
    const dueResult = computeDueTime(tierId, now, isAfterHours);
    const internalDueResult = computeInternalDueTime(dueResult.dueTime, tierId);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `OD-${randomSuffix}`;
    const token = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newOrder: InternalOrder = {
      id: orderId,
      token,
      property,
      customer,
      tier: tierId,
      status: 'MATCHING',
      createdAt: now.toISOString(),
      customerDueTime: dueResult.dueTimeISO,
      internalDueTime: internalDueResult.internalDueTime.toISOString(),
      price: tier.price,
      providerPayout: tier.providerPayout,
      messages: [
        {
          id: `msg-${Date.now()}`,
          orderId,
          senderRole: 'system',
          content: 'Order placed. Searching for available certified abstractor in county land records.',
          timestamp: now.toISOString(),
          formattedTime: 'Just now',
        },
      ],
      isAfterHours,
      lateRisk: 'LOW',
    };

    this.orders.unshift(newOrder);

    // Record audit event
    this.auditLog.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/New_York',
      }).format(now),
      eventType: 'ORDER_CREATED',
      orderId,
      actor: 'Guest Checkout',
      details: `${tier.name} ($${tier.price}) for ${property.address}, ${property.county}`,
    });

    return sanitizeForCustomer(newOrder);
  }

  /**
   * Retrieve order by customer token (Customer View)
   * HARD SEPARATION: returns CustomerOrderDTO only.
   */
  async getOrderByToken(token: string): Promise<CustomerOrderDTO | null> {
    await this.delay(400);
    const order = this.orders.find((o) => o.token === token || o.id === token);
    if (!order) return null;
    return sanitizeForCustomer(order);
  }

  /**
   * Lookup order by Order ID + Email/Phone for Track Page
   */
  async trackOrder(orderId: string, emailOrPhone: string): Promise<CustomerOrderDTO | null> {
    await this.delay(500);
    const cleanId = orderId.trim().toUpperCase();
    const cleanContact = emailOrPhone.trim().toLowerCase();

    const order = this.orders.find((o) => {
      const matchId = o.id === cleanId || o.id.replace('OD-', '') === cleanId;
      const matchContact =
        o.customer.email.toLowerCase() === cleanContact ||
        o.customer.mobile.replace(/\D/g, '') === cleanContact.replace(/\D/g, '');
      return matchId && matchContact;
    });

    if (!order) return null;
    return sanitizeForCustomer(order);
  }

  /**
   * Provider View: get order by order ID
   * HARD SEPARATION: returns ProviderOrderDTO (no customer info)
   */
  async getOrderForProvider(orderId: string): Promise<ProviderOrderDTO | null> {
    await this.delay(350);
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return null;
    return sanitizeForProvider(order);
  }

  /**
   * Internal Admin: get all orders with complete operational metadata
   */
  async getAllOrdersInternal(): Promise<InternalOrder[]> {
    await this.delay(300);
    return [...this.orders];
  }

  /**
   * Update order status manually (for demo stage jumper)
   */
  updateOrderStatus(orderIdOrToken: string, newStatus: OrderStatus): CustomerOrderDTO | null {
    const order = this.orders.find((o) => o.token === orderIdOrToken || o.id === orderIdOrToken);
    if (!order) return null;

    order.status = newStatus;

    if (newStatus === 'ASSIGNED' && !order.assignedProviderId) {
      order.assignedProviderId = 'prov-001';
      order.assignedProviderName = 'Marcus Vance';
      order.assignedAt = new Date().toISOString();
    }

    if (newStatus === 'READY' && !order.report) {
      order.report = { ...MOCK_REPORT_SAMPLE, id: `RPT-2026-${order.id.replace('OD-', '')}` };
    }

    return sanitizeForCustomer(order);
  }

  /**
   * Add message to order clarification thread
   */
  async addMessage(
    orderIdOrToken: string,
    senderRole: 'customer' | 'abstractor' | 'system',
    content: string
  ): Promise<OrderMessage> {
    await this.delay(300);
    const order = this.orders.find((o) => o.token === orderIdOrToken || o.id === orderIdOrToken);
    if (!order) throw new Error('Order not found');

    const newMessage: OrderMessage = {
      id: `msg-${Date.now()}`,
      orderId: order.id,
      senderRole,
      content,
      timestamp: new Date().toISOString(),
      formattedTime: 'Just now',
    };

    order.messages.push(newMessage);
    return newMessage;
  }

  /**
   * Provider accepts new offer
   */
  async acceptOffer(orderId: string, providerId: string): Promise<boolean> {
    await this.delay(450);
    const order = this.orders.find((o) => o.id === orderId);
    const provider = this.providers.find((p) => p.id === providerId);
    if (!order || !provider) return false;

    order.status = 'IN_PROGRESS';
    order.assignedProviderId = provider.id;
    order.assignedProviderName = provider.name;
    order.assignedAt = new Date().toISOString();
    provider.activeOrdersCount += 1;

    return true;
  }

  /**
   * Provider delivers finished search package
   */
  async deliverReport(orderId: string): Promise<boolean> {
    await this.delay(600);
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return false;

    order.status = 'READY';
    order.report = { ...MOCK_REPORT_SAMPLE, id: `RPT-2026-${order.id.replace('OD-', '')}` };
    return true;
  }

  /**
   * Admin alert resolve
   */
  async resolveAlert(alertId: string): Promise<boolean> {
    await this.delay(200);
    const alert = this.alerts.find((a) => a.id === alertId);
    if (!alert) return false;
    alert.resolved = true;
    return true;
  }

  /**
   * Get Active Alerts
   */
  async getAlerts(): Promise<SystemAlert[]> {
    await this.delay(250);
    return [...this.alerts];
  }

  /**
   * Get Providers
   */
  async getProviders(): Promise<typeof MOCK_PROVIDERS> {
    await this.delay(300);
    return [...this.providers];
  }

  /**
   * Get Audit Log
   */
  async getAuditLog(): Promise<typeof INITIAL_AUDIT_LOG> {
    await this.delay(250);
    return [...this.auditLog];
  }
}

export const mockMarketplace = new MockMarketplaceService();
