import { disableAuthAccess } from '../config';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { DirectiveNames } from './loadSchema';

export function registerDirective(schema: GraphQLSchema) {
    try{
        return mapSchema(schema, {
            [MapperKind.OBJECT_FIELD]: (field) => {
                const directive = getDirective(schema, field, DirectiveNames.PermissionsDirective)?.[0];
                if (directive) {
                    const { resolve } = field;
                    if (!resolve) {
                        return field;
                    }
                    let { permissions = [] } = directive ? directive : {};
                    field.resolve = async function (source, args, context, info) {
                        if (disableAuthAccess) {
                            return resolve(source, args, context, info);
                        }
                        return resolve(source, args, context, info);
                    };
                }
                return field;
            },
        });
    }catch (e) {
        console.log(e)
        throw e;
    }

}