import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import { executeInTheNextEventLoopTick } from '../../utils/utils';
import { PickersPopper } from '../PickersPopper';
import { InternalDesktopWrapperProps } from './DesktopWrapper';

export function DesktopTooltipWrapper(props: InternalDesktopWrapperProps) {
  const {
    children,
    DateInputProps,
    KeyboardDateInputComponent,
    onDismiss,
    open,
    PopperProps,
    TransitionComponent,
  } = props;
  const inputContainerRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      if (
        inputContainerRef.current?.contains(document.activeElement) ||
        popperRef.current?.contains(document.activeElement)
      ) {
        return;
      }

      onDismiss();
    });
  };

  const inputComponentRef = useForkRef(DateInputProps.ref, inputContainerRef);

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInputComponent {...DateInputProps} ref={inputComponentRef} onBlur={handleBlur} />
      <PickersPopper
        role="tooltip"
        open={open}
        containerRef={popperRef}
        anchorEl={inputContainerRef.current}
        TransitionComponent={TransitionComponent}
        PopperProps={PopperProps}
        onBlur={handleBlur}
        onClose={onDismiss}
      >
        {children}
      </PickersPopper>
    </WrapperVariantContext.Provider>
  );
}