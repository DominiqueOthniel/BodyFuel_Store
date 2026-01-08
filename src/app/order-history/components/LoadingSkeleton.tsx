const LoadingSkeleton = () => {
    return (
      <div className="space-y-4">
        {[1, 2, 3]?.map((i) => (
          <div key={i} className="bg-card rounded-lg shadow-elevation-2 overflow-hidden animate-pulse">
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-6 bg-muted rounded w-48 mb-2" />
                  <div className="h-4 bg-muted rounded w-64" />
                </div>
                <div className="h-10 bg-muted rounded w-32" />
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-muted/30">
              <div className="flex gap-3">
                {[1, 2, 3]?.map((j) => (
                  <div key={j} className="w-20 h-20 bg-muted rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default LoadingSkeleton;