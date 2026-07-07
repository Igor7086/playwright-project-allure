export const environments = {
    dev: 'https://dev.qacart-todo.herokuapp.com',
    stage: 'https://stage.qacart-todo.herokuapp.com',
    prod: 'https://qacart-todo.herokuapp.com',
} as const;

export type Environment = keyof typeof environments;
