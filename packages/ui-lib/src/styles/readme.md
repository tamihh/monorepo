CSS Guidelines
=======


##CSS Architecture for Design Systems - Summary

###Establish CSS Principles

        * Make it modular. – The design system is modular in every way, which very much applies to the way CSS is written. There should be clear separation between components.
        * Legibility is key. – Developers should be able to understand CSS code at a glance and understand the purpose of any given selector.
        * Clarity trumps succinctness – The design system may sometimes seem verbose, but it delivers clarity and reslience in exchange. Keeping CSS legible and scalable means sacrificing a shorter syntax.
        * Keep things flat – Long selector strings should be avoided wherever possible in order to keep CSS as DOM-independent and modular as possible.
        * Avoid conflicts – Since components will be deployed to many different applications, it’s critical to ensure that the design system’s CSS doesn’t conflict with other libraries and systems. This is accomplished by the system’s namespacing of class names, described in more detail below.


###CSS Code Conventions


####Global Namespace

All classes associated with the design system are prefixed with a global namespace, which is the Application Name followed by a hyphen:

    .ts-

####Class Prefixes

In addition to a global namespace, classes are prefixed to make it more apparent what job that class is doing:

    c- for UI components, such as .ts-c-card or .ts-c-header
    l- for layout-related styles, such as .ts-l-grid__item or .ts-l--two-column
    u- for utilities, such as .ts-u-margin-bottom-double or .ts-u-margin-bottom-double
    is- and has- for specific states, such as .ts-is-active or .ts-is-disabled. These state-based classes would apply to
    js- for targeting JavaScript-specific functionality, such as .js-modal-trigger. No styles are bound to these classes; they’re reserved for behavior only. For most cases, these js- classes would toggle state-based classes to an element.

####BEM ([Block Element Modifier](http://getbem.com/introduction/))

    Block is the primary component block, such as .ts-c-card or .ts-c-btn
    Element is a child of the primary block, such as .ts-c-card__title
    Modifier is a variation of a component style, such as .ts-c-alert--error

This methodology has been gaining a lot of popularity, and combining these concepts with the global namespace and class prefixes allowed us to create even more explicit, encapsulated class names.


####Anatomy of a class

The combination of a global namespace, category prefixes, and BEM syntax results in an explicit (and yes, verbose) class string that allows developers to deduce what job it plays in constructing the UI.

Let’s take a look at the following example:

    .ts-c-btn--secondary
    
        ts- is the global namespace for all styles coming from the design system.
        c- is the category of class, which in this case c- means “component”
        btn is the block name (“Block” being the “B” in BEM)
        --secondary is a modifier, indicating a stylistic variation of the block (“Modifier” being the “M” in BEM)

Here’s another example:

    .ts-l-grid__item
    
        ts- once again is the system’s global namespace.
        l- is the category of class, which in this case l- means “layout”
        grid is the block name
        __item is an element, indicating that this is a child of the block (“Element” being the “E” in BEM)

And one more:

    .ts-c-primary-nav__submenu
    
        ts- is the system’s global namespace.
        c- is the category of class, which in this case c- means “component”
        primary-nav is the block name
        __submenu is an element, indicating that this is a child of the block (“Element” being the “E” in BEM)

####Being Explicit with Minutia


#####Sass Parent Selectors

If I have a a primary navigation component, but want to adjust its alignment when it appears within a header component, do I put those styles in my header or primary navigation Sass partial?<br/><br/>
Thankfully, Sass parent selectors exist, which allows us to keep all component-specific styles under one roof:


    .ts-c-primary-nav {
        /**
         * Nav appearing in header
         * 1) Right-align navigation when it appears in the header
         */
        .ts-c-header & {
            margin-left: auto; /* 1 */
        }
    }

This means all my primary navigation styles can be found in the primary navigation Sass partial, rather than splitting them between multiple files.

#####Explicit Rules Around Sass Nesting

Nesting in Sass can be very convenient, but runs the risk of poor output with overly long selector strings. We followed the (Inception Rule)[http://thesassway.com/beginner/the-inception-rule] and never nested Sass more than three layers deep.

Keeping the design system’s CSS flatness principle in mind, we wanted to limit nesting to the following use cases:

    Modifiers of a style block
    Media queries
    Parent selectors
    States

1. Style block modifiers

    For modifiers, if the rule is only a few lines long, the modifier can be nested inside the parent like so:
    
        .ts-c-alert {
            border: 1px solid gray;
            color: gray;
        
            /**
             * Error Alert
             */
            &--error {
                border-color: red;
                color: red;
            }
        }
    
    Thanks to the & symbol, this would compile to:
    
        .ts-c-alert {
            border: 1px solid gray;
            color: gray;
        }
        
        
        .ts-c-alert--error {
            border-color: red;
            color: red;
        }
    
    For longer style blocks we didn’t nest the modifier code as it reduced the legibility of the code.
2. Media queries

    Component-specific media queries should be nested inside the component block.
    
        .ts-c-primary-nav {
            /* Base styles */
        
            /**
             * 1) On larger displays, convert to a horizontal list
             */
            @media all and (min-width: 40em) {
                display: flex;
            }
        }
    
    This compiles to:
    
        .ts-c-primary-nav {
            /* Base styles */
        }
        
        @media all and (min-width: 40em) {
            .ts-c-primary-nav {
                display: flex;
            }
        }

3. Parent selectors

    The design system will make use of Sass’s parent selector mechanism. This allows all rules for a given component to be maintained in one location.
    
        .ts-c-primary-nav {
            /**
             * Nav appearing in header
             * 1) Right-align navigation when it appears in the header
             */
            .ts-c-header & {
                margin-left: auto; /* 1 */
            }
        }
    
    This will compile to:
    
        .ts-c-header .ts-c-primary-nav {
            display: flex;
        }

    All styles for ts-c-primary-nav should be found in one place, rather than scattered throughout multiple partial files.

4. States

    States of a component should be included as a nested element. This includes hover, focus, and active states:
    
        .ts-c-btn {
            background: blue;
        
            &:hover, &:focus {
                background: red;
            }
        }

    This will compile to:
    
        .ts-c-btn {
            background: blue;
        }
        
        .ts-c-btn:hover, .ts-c-btn:focus {
            background: red;
        }

    States can also take the form of utility classes, such as is- and has-:
    
        .ts-c-accordion__panel {
            overflow: hidden;
            max-height: 0;
        
            &.ts-is-active {
                max-height: 40em;
            }
        }
    
    This will compile to:
    
        .ts-c-accordion__panel {
            overflow: hidden;
            max-height: 0;
        }
        
        .ts-c-accordion__panel.ts-is-active {
            max-height: 40em;
        }

####SaaS Variables

   Saas variables will be prefixed by 'ts' followed by an identifier of the file where it has been defined.
   For instance: '$ts-cl-green', where 'cl' stands for color.


Source: [CSS Architecture for Design Systems](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)
