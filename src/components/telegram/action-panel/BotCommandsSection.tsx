
export function BotCommandsSection() {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Bot Commands</h4>
      <div className="space-y-1.5 text-sm">
        <div className="font-mono bg-muted p-1 rounded text-xs">/quote [product]</div>
        <div className="font-mono bg-muted p-1 rounded text-xs">/renew [policy-number]</div>
        <div className="font-mono bg-muted p-1 rounded text-xs">/claim [policy-number]</div>
        <div className="font-mono bg-muted p-1 rounded text-xs">/upload [document-type]</div>
      </div>
    </div>
  );
}
