import { ExtendableContext } from 'koa';

const getCurrentUrlAsService = (context: ExtendableContext): string => {
    return `${context.protocol}://${context.get('host')}${context.originalUrl}`;
};

export default getCurrentUrlAsService;