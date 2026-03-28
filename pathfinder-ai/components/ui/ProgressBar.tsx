export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-[5px] bg-border rounded-full overflow-hidden">
      <div 
        className="h-full bg-amber transition-all duration-500 ease-out" 
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} 
      />
    </div>
  );
}
