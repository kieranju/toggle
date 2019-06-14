declare class ToggleHandler {
    private toggles;
    private triggerSelector;
    private receiverSelector;
    constructor();
    private init;
    private groupBy;
}
declare class Toggle {
    private triggers;
    private receivers;
    private toggleSelector;
    constructor(triggers: HTMLElement[], receivers: HTMLElement[]);
    private init;
    private toggle;
}
