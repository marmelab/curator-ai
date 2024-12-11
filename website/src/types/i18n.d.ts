import 'i18next';

declare module 'i18next' {
    interface i18n {
        use: (plugin: any) => i18n;
    }
}
