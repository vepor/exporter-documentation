// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import * as CSVParse from 'papaparse'

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Health

/** Create URL that directly download CSV from google sheets API */
export function constructGoogleSheetCSVUrl(sourceIdentifier, sourceName): string {
    return "https://docs.google.com/spreadsheets/d/" + sourceIdentifier + "/gviz/tq?tqx=out:csv&sheet=" + sourceName
}

/** Construct data from component status spreadsheet */
export function constructComponentOverview(data: any) {
    
    // Use papaparse(r) to parse the google sheet CSV
    let parsedData = CSVParse.parse(data, {
        header: true
    })

    /* Example parsed output:

    {
        "data":[
            {
                "Component": "Button",
                "Figma": "To be done",
                "Design status": "n/a"",
                "React": "Released",
                ... other columns
            }
        ],
    */

    // Find the component that has ID equal to component id
    if (!parsedData) {
        return undefined
    }

    let components: Array<object> = []

    for (const component of parsedData.data) {
        components.push({
            id: component["Component"],
            figma: component["Figma"],
            designStatus: component["Design status"],
            react: component["React"],
            reactStatus: component["React status"],
            healthStatus: component["Health status"],
            type: component["Type"],
            note: component["Note"],
            domain: component["Domain"],
            identificator: component["Identificator"],
            hasA11yColors: component["hasA11yColors"],
            hasResponsivity: component["hasResponsivity"],
            hasDesignTokens: component["hasDesignTokens"],
            matchesCodeStandards: component["matchesCodeStandards"],
            hasUsageGuidelines: component["hasUsageGuidelines"],
            hasReactDocumentation: component["hasReactDocumentation"],
        })
    }

    return components;
}
 
