const syntax = {
    attribute: {
        startTag:`{`,
        endTag: `}`,
    },
    variable: {
        blockStartTag: `<dtl:print=`,
        blockEndTag: `/>`,
    },
    variableShortHand: {
        blockStartTag: `<dtl=`,
        blockEndTag: `/>`,
    },
    ifStatements: {
        blockStartTag: {
            beginsWith: `<dtl:if=`,
            endsWith: `>`
        },
        blockEndTag: `</dtl:if>`,   
    },
    switchStatements: {
        blockStartTag: {
            beginsWith: `<dtl:switch=`,
            endsWith: `>`
        },
        blockEndTag: `</dtl:switch>`,
        caseBlocks: {
            blockStartTag: {
                beginsWith: `<dtl:case=`,
                endsWith: `>`
            },
            blockEndTag: `</dtl:case>`,
        }
    }
}