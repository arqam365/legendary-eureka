import Script from "next/script";

interface SchemaMarkupProps {
    schema: object | object[];
    id: string;
}

export function SchemaMarkup({ schema, id }: SchemaMarkupProps) {
    return (
        <Script
            id={id}
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
            }}
        />
    );
}

// Convenience component for multiple schemas
interface MultiSchemaProps {
    schemas: Array<{ id: string; schema: object }>;
}

export function MultiSchemaMarkup({ schemas }: MultiSchemaProps) {
    return (
        <>
            {schemas.map(({ id, schema }) => (
                <SchemaMarkup key={id} id={id} schema={schema} />
            ))}
        </>
    );
}