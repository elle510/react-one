/**
 * Splitter component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/05
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Splitter />
 *
 * jQuery Splitter Plugin 라이브러리에 종속적이다.
 * http://methvin.com/splitter/
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var SplitterPane = React.createClass({
    displayName: 'SplitterPane',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        minWidth: PropTypes.number,
        minHeight: PropTypes.number
    },
    render: function() {
        // 필수 항목
        const {id, className, minWidth, minHeight} = this.props;

        return (
            <div id={id} className={classNames('splitter-pane', className)} style={{minWidth: minWidth, minHeight: minHeight}}>{this.props.children}</div>
        );
    }
});

var Splitter = React.createClass({
    displayName: 'Splitter',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.object,
        type: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        minWidth: PropTypes.number,
        minHeight: PropTypes.number,
        sizeLeft: PropTypes.number,
        sizeRight: PropTypes.number,
        sizeTop: PropTypes.number,
        sizeBottom: PropTypes.number,
        minLeft: PropTypes.number,
        minRight: PropTypes.number,
        minTop: PropTypes.number,
        minBottom: PropTypes.number,
        maxLeft: PropTypes.number,
        maxRight: PropTypes.number,
        maxTop: PropTypes.number,
        maxBottom: PropTypes.number,
        anchorToWindow: PropTypes.bool,
        onInit: PropTypes.func
    },
    id: '',
    getChildren: function() {
        var children = this.props.children,
            count = 0;

        return React.Children.map(children, (child) => {
            if(child === null) {
                return null;
            }

            var extraChildProps = {};
            if(count++ < 2) {
                if(child.props.type === 'h' || child.props.type === 'v') {
                    this.childId = Util.getUUID();
                    this.childProps = child.props;
                    this.childOptions = this.getOptions(child.props);

                    extraChildProps = {
                        id: this.childId
                    }
                }

                return React.cloneElement(child, extraChildProps);
            }
        });
    },
    getOptions: function(props) {

        const {type, sizeLeft, sizeRight, sizeTop, sizeBottom, minLeft, minRight, minTop, minBottom, maxLeft, maxRight, maxTop, maxBottom, anchorToWindow} = props;

        // options (getDefaultProps 에서 초기화, childOptions 인 경우는 초기화 안되어 있음)
        var options = typeof props.options === 'undefined' ? {} : props.options;

        // type
        if(type === 'v' || type === 'h') {
            options.type = type;
        }else {
            options.type = 'v';
        }

        // pane size
        if(typeof sizeLeft === 'number') {
            options.sizeLeft = sizeLeft;
        }

        if(typeof sizeRight === 'number') {
            options.sizeRight = sizeRight;
        }

        if(typeof sizeTop === 'number') {
            options.sizeTop = sizeTop;
        }

        if(typeof sizeBottom === 'number') {
            options.sizeBottom = sizeBottom;
        }

        // pane min
        if(typeof minLeft === 'number') {
            options.minLeft = minLeft;
        }

        if(typeof minRight === 'number') {
            options.minRight = minRight;
        }

        if(typeof minTop === 'number') {
            options.minTop = minTop;
        }

        if(typeof minBottom === 'number') {
            options.minBottom = minBottom;
        }

        // pane max
        if(typeof maxLeft === 'number') {
            options.maxLeft = maxLeft;
        }

        if(typeof maxRight === 'number') {
            options.maxRight = maxRight;
        }

        if(typeof maxTop === 'number') {
            options.maxTop = maxTop;
        }

        if(typeof maxBottom === 'number') {
            options.maxBottom = maxBottom;
        }

        // anchorToWindow
        if(typeof anchorToWindow === 'boolean') {
            options.anchorToWindow = anchorToWindow;
        }

        //options.resizeToWidth = true;

        return options;

    },
	getDefaultProps: function() {
		// 클래스가 생성될 때 한번 호출되고 캐시된다.
		// 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
		return {options: {}, type: 'v'};
	},
    componentWillMount: function() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        let id = this.props.id;
        if(typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        var sp = $('#'+this.id), props = this.props;

        // min-width, min-height 설정(splitter() 호출전에 설정해야 적용이 된다.)
        // 3-Column 일 경우 반드시 minHeight 설정
        if(typeof props.minWidth === 'number') {
            sp.css('min-width', props.minWidth + 'px');
        }

        if(typeof props.minHeight === 'number') {
            sp.css('min-height', props.minHeight + 'px');
        }

        // Horizontal 인 경우 splitter 호출전 height 설정 되어야 함
        var spHeight;
        if(props.type === 'h') {
            if(typeof props.height === 'number') {
                spHeight = props.height;
            }else {
                spHeight = $(window).height();
            }

            sp.css('height', spHeight + 'px');
        }

        // splitter
        sp.splitter(this.getOptions(props));

        if(typeof this.childId === 'string') {
            var spChild = $('#'+this.childId);

            // Horizontal 인 경우 splitter 호출전 height 설정 되어야 함
            var spChildHeight;
            if(this.childProps.type === 'h') {
                if(typeof this.childProps.height === 'number') {
                    spChildHeight = this.childProps.height;
                }else {
                    spChildHeight = $(window).height();
                }

                console.log(sp.height());
                spChild.css('height', sp.height() + 'px');
            }

            spChild.splitter(this.childOptions);
        }

        // window resize
        var height, paneHeight;
        $(window).bind('resize', function() {
            if(typeof props.height === 'number') {
                height = props.height;
            }else {
                height = $(window).height();
            }

            sp.css('height', height + 'px');

            if(props.type === 'v') {
                paneHeight = sp.height();
                sp.find('.splitter-pane').css('height', paneHeight + 'px');
                sp.find('.vsplitbar').css('height', paneHeight + 'px');

            }else if(props.type === 'h') {
                sp.find('.hsplitbar').css('width', sp.width() + 'px');
            }

        }).trigger('resize');

        //$("#MySplitter").css('height', height + 'px').trigger('resize');

        if(typeof this.props.onInit === 'function') {
            this.props.onInit();
        }
    },
    render: function() {
        // 필수 항목
        const {className} = this.props;

        return (
            <div id={this.id} className={classNames('splitter', className)}>{this.getChildren()}</div>
        );
    }
});

module.exports = {
    Splitter: Splitter,
    SplitterPane: SplitterPane
};