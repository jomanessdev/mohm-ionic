export default class ConfigClasses{
    
    createToastConfig(_message: string): any{
        return {
            message: _message,
            duration: 3000,
            position: 'top'
        };
    }
}