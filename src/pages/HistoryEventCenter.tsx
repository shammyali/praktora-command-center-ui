
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import HistoryFilters, { HistoryFilters as HistoryFiltersType } from "@/components/history/HistoryFilters";
import HistoryTimeline from "@/components/history/HistoryTimeline";
import { historyEvents, HistoryEvent } from "@/data/historyData";

const HistoryEventCenter = () => {
  const [searchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState<HistoryEvent[]>(historyEvents);
  const [filters, setFilters] = useState<HistoryFiltersType>({
    searchQuery: "",
    entityTypes: [],
    eventTypes: [],
    actors: [],
    timePeriod: "all",
    channels: [],
    outcomes: [],
    showOnlyAI: false,
    showOnlyAutomation: false,
    showOnlyManual: false,
  });

  // Handle filtering of events
  useEffect(() => {
    let filtered = [...historyEvents];
    
    // Check for event ID in URL
    const eventId = searchParams.get("event");
    if (eventId) {
      filtered = filtered.filter(event => event.id === eventId);
      return setFilteredEvents(filtered);
    }

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        event =>
          event.id.toLowerCase().includes(query) ||
          event.actor.name.toLowerCase().includes(query) ||
          event.targetEntity.id.toLowerCase().includes(query) ||
          event.action.toLowerCase().includes(query) ||
          (event.targetEntity.name && event.targetEntity.name.toLowerCase().includes(query)) ||
          (event.details && event.details.toLowerCase().includes(query))
      );
    }

    // Apply entity type filter
    if (filters.entityTypes.length > 0) {
      filtered = filtered.filter(event => filters.entityTypes.includes(event.targetEntity.type));
    }

    // Apply event type filter
    if (filters.eventTypes.length > 0) {
      filtered = filtered.filter(event => filters.eventTypes.includes(event.eventType));
    }

    // Apply actor filter
    if (filters.actors.length > 0) {
      filtered = filtered.filter(event => filters.actors.includes(event.actor.type));
    }

    // Apply time period filter
    if (filters.timePeriod !== "all") {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (filters.timePeriod) {
        case "today":
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case "yesterday":
          cutoffDate.setDate(now.getDate() - 1);
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case "last7":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "last30":
          cutoffDate.setDate(now.getDate() - 30);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(event => new Date(event.timestamp) >= cutoffDate);
    }

    // Apply channel filter
    if (filters.channels.length > 0) {
      filtered = filtered.filter(
        event => event.channel && filters.channels.includes(event.channel)
      );
    }

    // Apply outcome filter
    if (filters.outcomes.length > 0) {
      filtered = filtered.filter(event => filters.outcomes.includes(event.outcome));
    }

    // Apply special filters
    if (filters.showOnlyAI) {
      filtered = filtered.filter(event => event.isAIEvent || event.actor.type === 'P²RA AI');
    }
    
    if (filters.showOnlyAutomation) {
      filtered = filtered.filter(event => event.isAutomationEvent || event.actor.type === 'Automation Engine');
    }
    
    if (filters.showOnlyManual) {
      filtered = filtered.filter(event => event.actor.type === 'User');
    }

    setFilteredEvents(filtered);
  }, [filters, searchParams]);

  const handleFilterChange = (newFilters: HistoryFiltersType) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="flex h-full">
        <div className="w-72 border-r h-full">
          <HistoryFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1 h-full overflow-hidden">
          <HistoryTimeline events={filteredEvents} filters={filters} />
        </div>
      </div>
    </Layout>
  );
};

export default HistoryEventCenter;
