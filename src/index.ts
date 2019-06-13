class ToggleHandler {
    private toggles: Toggle[] = []
    private triggerSelector: string = 'data-toggle-trigger'
    private receiverSelector: string = 'data-toggle-receiver'

    constructor() {
        this.init()
    }

    private init() {
        const triggers = Array.from(document.querySelectorAll(`[${this.triggerSelector}]`) as NodeListOf<HTMLElement>)
        const receivers = Array.from(document.querySelectorAll(`[${this.receiverSelector}]`) as NodeListOf<HTMLElement>)

        const triggerGroups = this.groupBy(triggers, trigger => trigger.getAttribute(this.triggerSelector) as string)
        const receiverGroups = this.groupBy(receivers, receiver => receiver.getAttribute(this.receiverSelector) as string)

        triggerGroups.forEach((triggerGroup, key) => {
            const receiverGroup = receiverGroups.get(key) as HTMLElement[]
            this.toggles.push(new Toggle(triggerGroup, receiverGroup))
        })
    }

    private groupBy(items: HTMLElement[], callback: (item: HTMLElement) => string): Map<string, HTMLElement[]> {
        const itemGroups: Map<string, HTMLElement[]> = new Map()
        items.map((item) => {
            const key = callback(item)
            const itemGroup = itemGroups.get(key)
            if (!itemGroup) {
                itemGroups.set(key, [item])
            } else {
                itemGroup.push(item)
                itemGroups.set(key, itemGroup)
            }
        })

        return itemGroups
    }
}

class Toggle {
    private triggers: HTMLElement[]
    private receivers: HTMLElement[]
    private toggleSelector: string = 'data-toggle'

    constructor(triggers: HTMLElement[], receivers: HTMLElement[]) {
        this.triggers = triggers
        this.receivers = receivers
        this.init()
    }

    private init() {
        this.triggers.forEach((trigger: HTMLElement) => {
            trigger.addEventListener('click', (event: MouseEvent) => {
                this.toggle(this.triggers)
                this.toggle(this.receivers)
            })
        })
    }

    private toggle(elements: HTMLElement[]) {
        elements.map((element: HTMLElement) => {
            element.classList.toggle(element.getAttribute(this.toggleSelector) as string)
        })
    }
}