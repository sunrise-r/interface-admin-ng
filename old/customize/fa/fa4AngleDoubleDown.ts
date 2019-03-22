import { IconDefinition, IconName } from '@fortawesome/fontawesome-common-types';

export const prefix: string = 'fa4';
export const iconName: IconName = 'angle-double-down';
export const width: number = 1008;
export const height: number = 1152;
export const ligatures: string[] = [];
export const unicode: string = 'f103';
export const svgPathData: string =
    'M1075 672q0 -13 -10 -23l-466 -466q-10 -10 -23 -10t-23 10l-466 466q-10 10 -10 23t10 23l50 50q10 10 23 10t23 -10l393 -393l393 393q10 10 23 10t23 -10l50 -50q10 -10 10 -23zM1075 1056q0 -13 -10 -23l-466 -466q-10 -10 -23 -10t-23 10l-466 466q-10 10 -10 23 t10 23l50 50q10 10 23 10t23 -10l393 -393l393 393q10 10 23 10t23 -10l50 -50q10 -10 10 -23z';

export const definition = <IconDefinition>{
    prefix: prefix,
    iconName: iconName,
    icon: [width, height, ligatures, unicode, svgPathData]
};
export const fa4AngleDoubleDown = definition;
