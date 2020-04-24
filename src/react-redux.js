import React from "react";
import PropTypes from "prop-types";
export class Provider extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return { store: this.store }
    }

    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }

    //渲染被Provider包裹的组件
    render() {
        return this.props.children
    }
};

export function connect(mapStateToProps, mapDispatchToProps) {
    return function(Component) {
        class Connect extends React.Component {
            componentDidMount() {
                this.context.store.subscribe(this.handleStoreChange.bind(this));
            }

            handleStoreChange() {
                this.forceUpdate();
            }

            render() {
                return (
                    <Component
                        {...this.props}
                        {...mapStateToProps(this.context.store.getState())}
                        {...mapDispatchToProps(this.context.store.dispatch)}
                    />
                )
            }
        }

        Connect.contextTypes = {
            store: PropTypes.object
        }

        return Connect;
    }
}